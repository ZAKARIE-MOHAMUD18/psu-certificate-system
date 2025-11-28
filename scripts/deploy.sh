#!/bin/bash

echo "Deploying PSU Certificate System..."

# Deploy frontend to Vercel
echo "Deploying frontend to Vercel..."
cd frontend
vercel --prod
cd ..

# Trigger backend deployment on Render
echo "Backend will auto-deploy on git push to main branch"
echo "Or manually deploy via Render dashboard"

echo "Deployment initiated!"
echo "Frontend: Check Vercel dashboard"
echo "Backend: Check Render dashboard"