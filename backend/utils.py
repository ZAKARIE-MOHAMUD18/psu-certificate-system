import qrcode
import random
import string
from io import BytesIO
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
import os

def generate_verification_code():
    """Generate a 12-character verification code"""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

def generate_qr_code(verification_code, base_url):
    """Generate QR code for certificate verification"""
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    verification_url = f"{base_url}/verify/{verification_code}"
    qr.add_data(verification_url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    return base64.b64encode(buffer.getvalue()).decode()

def generate_digital_signature(certificate_data):
    """Generate digital signature for certificate"""
    # Generate private key
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    
    # Create signature data
    signature_data = f"{certificate_data['student_name']}{certificate_data['student_id']}{certificate_data['verification_code']}"
    
    # Sign the data
    signature = private_key.sign(
        signature_data.encode(),
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.MAX_LENGTH
        ),
        hashes.SHA256()
    )
    
    return base64.b64encode(signature).decode()

def validate_certificate_data(data):
    """Validate certificate input data"""
    required_fields = ['student_name', 'student_id', 'program', 'degree_type', 'graduation_date']
    
    for field in required_fields:
        if not data.get(field):
            return False, f"Missing required field: {field}"
    
    return True, None