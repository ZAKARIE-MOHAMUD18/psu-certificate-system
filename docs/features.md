# System Features

## Core Features

### Certificate Management
- ✅ Create new certificates with student details
- ✅ Generate unique 12-character verification codes
- ✅ Digital signature generation for security
- ✅ SQLite database storage with persistence

### Certificate Verification
- ✅ Verify certificates using verification codes
- ✅ QR code generation for easy verification
- ✅ Real-time validation status
- ✅ Detailed certificate information display

### User Interface
- ✅ Responsive web interface with Tailwind CSS
- ✅ Three main sections: Create, Verify, List
- ✅ Form validation and error handling
- ✅ Pagination for certificate lists

### Security Features
- ✅ Digital signatures using RSA encryption
- ✅ Unique verification codes
- ✅ CORS protection
- ✅ Input validation and sanitization

### Deployment
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Render with persistent storage
- ✅ SQLite database with automatic migrations
- ✅ Environment-based configuration

## Technical Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Responsive design
- Environment variable support

### Backend
- Flask web framework
- SQLAlchemy ORM
- Alembic migrations
- QR code generation
- Digital signature creation

### Database
- SQLite for simplicity and portability
- Persistent storage on Render
- Automatic table creation
- Migration support

### Infrastructure
- Docker for local development
- GitHub Actions for CI/CD
- Vercel for frontend hosting
- Render for backend hosting