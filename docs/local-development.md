# Local Development Setup

## Prerequisites
- Docker & Docker Compose
- Git

## Quick Start

```bash
git clone <repo-url>
cd psu-certificate-system
docker-compose up
```

## Services
- **Frontend**: http://localhost:3000 (React + Vite)
- **Backend**: http://localhost:5000 (Flask)
- **Database**: SQLite file in `backend/data/database.sqlite`

## Development Workflow

### Frontend Changes
- Files auto-reload on save
- Tailwind CSS included
- API calls proxy to backend

### Backend Changes
- Flask debug mode enabled
- Auto-reload on file changes
- SQLite database persists in Docker volume

### Database Management
```bash
# Access backend container
docker-compose exec backend bash

# Run migrations
flask db upgrade

# Create new migration
flask db migrate -m "description"
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=PSU Certificate System
```

### Backend (.env)
```
FLASK_ENV=development
DATABASE_URL=sqlite:///data/database.sqlite
SECRET_KEY=dev-secret-key
CORS_ORIGINS=http://localhost:3000
```

## Troubleshooting

### Port Conflicts
- Change ports in `docker-compose.yml`
- Update proxy settings in `vite.config.js`

### Database Issues
- Delete volume: `docker-compose down -v`
- Recreate: `docker-compose up`