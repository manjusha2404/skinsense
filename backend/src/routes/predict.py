from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
from io import BytesIO
import os
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from models.prediction import Prediction, engine
from utils.logger import setup_logger
from utils.mapping import DISEASE_TO_CATEGORY, FIRST_AID, RECOMMENDATION

predict_bp = Blueprint('predict', __name__)
logger = setup_logger()

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../model/skin_infection_model.h5')
if not os.path.exists(MODEL_PATH):
    logger.error(f"Model file not found at {MODEL_PATH}")
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
model = load_model(MODEL_PATH)
logger.info("Model loaded successfully")

DISEASE_CLASSES = [
    'Acne', 'Impetigo', 'Cellulitis', 'Folliculitis',
    'Tinea Ringworm', 'Seborrheic Keratoses', 'Candidiasis',
    'Herpes Zoster', 'Herpes Simplex', 'Warts', 'Molluscum Contagiosum', 'Chickenpox',
    'Scabies', 'Lice',
    'Melanoma', 'Eczema', 'Psoriasis', 'Bullous Disease', 'Poison Ivy',
    'Vascular Tumors', 'Basal Cell Carcinoma', 'Actinic Keratosis', 'Urticaria',
    'Rosacea', 'Light Diseases'
]

# Create database session
Session = sessionmaker(bind=engine)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        logger.error("No image uploaded in request")
        return jsonify({'error': 'No image uploaded'}), 400

    try:
        # Load and preprocess image
        image_file = request.files['image']
        image_filename = f"{int(datetime.now().timestamp())}_{image_file.filename}"
        image_path = os.path.join(os.path.dirname(__file__), '../../uploads', image_filename)
        image_file.save(image_path)

        image = load_img(image_path, target_size=(224, 224))
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Predict
        prediction = model.predict(image_array)
        predicted_idx = np.argmax(prediction)
        predicted_disease = DISEASE_CLASSES[predicted_idx]
        confidence = float(np.max(prediction))
        predicted_category = DISEASE_TO_CATEGORY.get(predicted_disease, 'Non-Infectious')

        # Save to database
        session = Session()
        prediction_entry = Prediction(
            imagePath=f"/uploads/{image_filename}",
            disease=predicted_disease,
            category=predicted_category,
            confidence=confidence
        )
        session.add(prediction_entry)
        session.commit()
        prediction_id = prediction_entry.id
        session.close()

        # Log prediction
        logger.info(f"Disease: {predicted_disease}, Category: {predicted_category}, Confidence: {confidence:.4f}")

        # Prepare response
        response = {
            'disease': predicted_disease,
            'category': predicted_category,
            'confidence': confidence,
            'first_aid': FIRST_AID.get(predicted_category, 'Clean the area and keep it dry.'),
            'recommendation': RECOMMENDATION,
            'imageUrl': f"/uploads/{image_filename}",
            'predictionId': prediction_id
        }

        return jsonify(response)
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500