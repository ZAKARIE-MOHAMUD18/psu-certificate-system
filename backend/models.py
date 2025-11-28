from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class Certificate(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    student_name = db.Column(db.String(100), nullable=False)
    student_id = db.Column(db.String(20), nullable=False)
    program = db.Column(db.String(100), nullable=False)
    degree_type = db.Column(db.String(50), nullable=False)
    graduation_date = db.Column(db.Date, nullable=False)
    gpa = db.Column(db.Float)
    honors = db.Column(db.String(50))
    verification_code = db.Column(db.String(12), unique=True, nullable=False)
    digital_signature = db.Column(db.Text)
    qr_code_path = db.Column(db.String(200))
    pdf_path = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_name': self.student_name,
            'student_id': self.student_id,
            'program': self.program,
            'degree_type': self.degree_type,
            'graduation_date': self.graduation_date.isoformat(),
            'gpa': self.gpa,
            'honors': self.honors,
            'verification_code': self.verification_code,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }