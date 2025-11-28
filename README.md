# Puntland State University (PSU) Certificate Verification System

## Architecture Overview

- **Frontend**: React + Vite → Deployed on Vercel
- **Backend**: Flask + SQLite → Deployed on Render
- **Database**: SQLite file (persistent on Render)

## Project Structure

```
psu-certificate-system/
├── frontend/          # React + Vite frontend
├── backend/           # Flask backend
├── infra/            # Infrastructure configs
├── docs/             # Documentation
├── scripts/          # Utility scripts
└── docker-compose.yml # Local development
```

## Quick Start (Local Development)

```bash
# Clone and start with Docker
git clone <repo-url>
cd psu-certificate-system
docker-compose up
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment

- **Frontend**: Auto-deploys to Vercel on push to main
- **Backend**: Auto-deploys to Render on push to main
- **Database**: SQLite file persists on Render's disk

See `/docs/deployment.md` for detailed instructions.