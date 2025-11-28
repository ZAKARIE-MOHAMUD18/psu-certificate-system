from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, Certificate
from utils import generate_verification_code, generate_qr_code, generate_digital_signature, validate_certificate_data
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///data/database.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

db.init_app(app)
migrate = Migrate(app, db)
CORS(app, origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','))

@app.route('/api/health')
def health():
    return {'status': 'ok', 'message': 'PSU Certificate System Backend'}

@app.route('/api/certificates', methods=['POST'])
def create_certificate():
    try:
        data = request.get_json()
        
        # Validate input data
        is_valid, error_msg = validate_certificate_data(data)
        if not is_valid:
            return jsonify({'error': error_msg}), 400
        
        # Generate verification code
        verification_code = generate_verification_code()
        
        # Create certificate
        certificate = Certificate(
            student_name=data['student_name'],
            student_id=data['student_id'],
            program=data['program'],
            degree_type=data['degree_type'],
            graduation_date=datetime.strptime(data['graduation_date'], '%Y-%m-%d').date(),
            gpa=data.get('gpa'),
            honors=data.get('honors'),
            verification_code=verification_code
        )
        
        # Generate digital signature
        certificate.digital_signature = generate_digital_signature({
            'student_name': certificate.student_name,
            'student_id': certificate.student_id,
            'verification_code': verification_code
        })
        
        db.session.add(certificate)
        db.session.commit()
        
        return jsonify({
            'message': 'Certificate created successfully',
            'certificate': certificate.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/certificates/<verification_code>/verify', methods=['GET'])
def verify_certificate(verification_code):
    try:
        certificate = Certificate.query.filter_by(
            verification_code=verification_code,
            is_active=True
        ).first()
        
        if not certificate:
            return jsonify({
                'valid': False,
                'message': 'Certificate not found or invalid'
            }), 404
        
        return jsonify({
            'valid': True,
            'certificate': certificate.to_dict()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/certificates/<verification_code>/qr', methods=['GET'])
def get_qr_code(verification_code):
    try:
        certificate = Certificate.query.filter_by(
            verification_code=verification_code,
            is_active=True
        ).first()
        
        if not certificate:
            return jsonify({'error': 'Certificate not found'}), 404
        
        base_url = request.host_url.rstrip('/')
        qr_code_data = generate_qr_code(verification_code, base_url)
        
        return jsonify({
            'qr_code': qr_code_data,
            'verification_url': f"{base_url}/verify/{verification_code}"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/certificates', methods=['GET'])
def list_certificates():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        certificates = Certificate.query.filter_by(is_active=True).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'certificates': [cert.to_dict() for cert in certificates.items],
            'total': certificates.total,
            'pages': certificates.pages,
            'current_page': page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)