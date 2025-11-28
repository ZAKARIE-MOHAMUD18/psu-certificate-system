# API Documentation

## Base URL
- Local: `http://localhost:5000/api`
- Production: `https://psu-certificate-system.onrender.com/api`

## Endpoints

### Health Check
```
GET /health
```
Returns system status.

### Create Certificate
```
POST /certificates
Content-Type: application/json

{
  "student_name": "John Doe",
  "student_id": "PSU2024001",
  "program": "Computer Science",
  "degree_type": "Bachelor",
  "graduation_date": "2024-06-15",
  "gpa": 3.75,
  "honors": "Cum Laude"
}
```

### Verify Certificate
```
GET /certificates/{verification_code}/verify
```
Returns certificate details if valid.

### Get QR Code
```
GET /certificates/{verification_code}/qr
```
Returns base64 encoded QR code image.

### List Certificates
```
GET /certificates?page=1&per_page=10
```
Returns paginated list of certificates.

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "certificate": {
    "id": "uuid",
    "student_name": "John Doe",
    "verification_code": "ABC123DEF456",
    ...
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```