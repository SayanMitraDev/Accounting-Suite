#!/bin/bash

# Setup Accounting App Database

echo "🔧 Setting up Accounting App..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
cd backend
npx prisma generate

# Create and migrate database
echo "📊 Creating database schema..."
npx prisma db push --skip-generate

# Create seed data (optional)
echo "🌱 Database setup complete!"

echo ""
echo "✅ Ready to run!"
echo "   npm run dev (in backend folder)"
