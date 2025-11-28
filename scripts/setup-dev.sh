#!/bin/bash

echo "Setting up PSU Certificate System for development..."

# Copy environment files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

echo "Environment files created."

# Start services
echo "Starting Docker services..."
docker-compose up -d

echo "Waiting for services to start..."
sleep 10

# Check if services are running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend running at http://localhost:3000"
else
    echo "❌ Frontend not responding"
fi

if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend running at http://localhost:5000"
else
    echo "❌ Backend not responding"
fi

echo "Setup complete!"
echo "Run 'docker-compose logs -f' to view logs"