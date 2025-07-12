# Mapping of 23 diseases to 4 categories
DISEASE_TO_CATEGORY = {
    'Acne': 'Bacterial',
    'Impetigo': 'Bacterial',
    'Cellulitis': 'Bacterial',
    'Folliculitis': 'Bacterial',
    'Tinea Ringworm': 'Fungal',
    'Seborrheic Keratoses': 'Fungal',
    'Candidiasis': 'Fungal',
    'Herpes Zoster': 'Viral',
    'Herpes Simplex': 'Viral',
    'Warts': 'Viral',
    'Molluscum Contagiosum': 'Viral',
    'Chickenpox': 'Viral',
    'Scabies': 'Parasitic',
    'Lice': 'Parasitic',
    'Melanoma': 'Non-Infectious',
    'Eczema': 'Non-Infectious',
    'Psoriasis': 'Non-Infectious',
    'Bullous Disease': 'Non-Infectious',
    'Poison Ivy': 'Non-Infectious',
    'Vascular Tumors': 'Non-Infectious',
    'Basal Cell Carcinoma': 'Non-Infectious',
    'Actinic Keratosis': 'Non-Infectious',
    'Urticaria': 'Non-Infectious',
    'Rosacea': 'Non-Infectious',
    'Light Diseases': 'Non-Infectious'
}

# First aid recommendations
FIRST_AID = {
    'Bacterial': 'Clean with mild soap and water. Apply an over-the-counter antibiotic ointment (e.g., Neosporin). Cover with a sterile bandage.',
    'Fungal': 'Keep the area clean and dry. Apply an antifungal cream (e.g., clotrimazole or miconazole). Avoid tight clothing.',
    'Viral': 'Keep clean to prevent secondary infections. Avoid touching or scratching. Use antiviral creams if prescribed.',
    'Parasitic': 'Avoid scratching. Use prescribed antiparasitic creams (e.g., permethrin). Wash bedding and clothing in hot water.',
    'Non-Infectious': 'Keep the area clean and monitor for changes. Consult a dermatologist for specific treatment.'
}

RECOMMENDATION = 'Consult a doctor for accurate diagnosis and treatment, as this analysis is not a substitute for professional medical advice.'