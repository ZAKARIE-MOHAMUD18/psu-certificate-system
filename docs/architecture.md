# System Architecture

## Overview
PSU Certificate Verification System uses a modern web architecture with separate frontend and backend deployments.

## Components

### Frontend (React + Vite)
- **Deployment**: Vercel
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Build**: Static files served via CDN

### Backend (Flask)
- **Deployment**: Render
- **Framework**: Flask with SQLAlchemy
- **Database**: SQLite with persistent disk
- **Server**: Gunicorn in production

### Database (SQLite)
- **Location**: `/data/database.sqlite` on Render
- **Persistence**: Render persistent disk (1GB)
- **Migrations**: Alembic for schema management

## Data Flow

```
User → Vercel (Frontend) → Render (Backend) → SQLite
```

## API Routes
- Frontend routes: `/*` → Vercel
- API routes: `/api/*` → Render backend

## Security
- CORS configured for cross-origin requests
- Environment variables for secrets
- Digital signatures for certificate verification

## Scalability
- Frontend: Auto-scaling via Vercel CDN
- Backend: Render auto-scaling (2 workers default)
- Database: SQLite suitable for moderate load

## Monitoring
- Vercel: Built-in analytics and logs
- Render: Application logs and metrics
- SQLite: File-based, no external monitoring needed