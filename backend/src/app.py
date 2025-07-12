from flask import Flask
from flask_cors import CORS
from routes.predict import predict_bp
import os
from dotenv import load_dotenv
from utils.logger import setup_logger

load_dotenv()

app = Flask(__name__, static_folder='../uploads', static_url_path='/uploads')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
logger = setup_logger()

# Register blueprints
app.register_blueprint(predict_bp, url_prefix='/api')

if __name__ == '__main__':
    logger.info("Starting Flask server")
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5001)), debug=True)