#!/bin/bash

# ============================================
# VPS Environment Setup Script
# ============================================
# This script helps you create the .env file on your VPS

set -e

echo "🔧 ReStore VPS Environment Configuration"
echo "========================================"
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to backup and create a new one? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mv .env .env.backup.$(date +%Y%m%d_%H%M%S)
        echo "✅ Backed up existing .env file"
    else
        echo "❌ Aborted. Edit your existing .env file manually."
        exit 0
    fi
fi

echo "📝 Creating .env file..."
echo ""
echo "Please provide the following values:"
echo ""

# Database Configuration
read -p "Database Password [YourStrong@Passw0rd]: " DB_PASSWORD
DB_PASSWORD=${DB_PASSWORD:-YourStrong@Passw0rd}

read -p "Database Name [RestoreDb]: " DB_NAME
DB_NAME=${DB_NAME:-RestoreDb}

# VPS IP/Domain
read -p "Your VPS IP or Domain: " VPS_HOST
CORS_ORIGIN="http://${VPS_HOST}"

# API Keys
echo ""
echo "🔑 API Keys (paste your keys):"
read -p "Stripe Publishable Key: " STRIPE_PUBLISHABLE_KEY
read -p "Stripe Secret Key: " STRIPE_SECRET_KEY
read -p "Stripe Webhook Secret: " STRIPE_WEBHOOK_SECRET

echo ""
read -p "Cloudinary Cloud Name: " CLOUDINARY_CLOUD_NAME
read -p "Cloudinary API Key: " CLOUDINARY_API_KEY
read -p "Cloudinary API Secret: " CLOUDINARY_API_SECRET

echo ""
read -p "Gemini API Key: " GEMINI_API_KEY

echo ""
read -p "Pinecone API Key: " PINECONE_API_KEY

# Create .env file
cat > .env << EOF
# ============================================
# ReStore Production Environment Variables
# Generated: $(date)
# ============================================

# Database Configuration
DB_SERVER=db
DB_PORT=1433
DB_NAME=${DB_NAME}
DB_USER=sa
DB_PASSWORD=${DB_PASSWORD}

# CORS Configuration
CORS_ORIGIN=${CORS_ORIGIN}

# Stripe Settings
STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}

# Cloudinary Settings
CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}

# Gemini API Settings
GEMINI_API_KEY=${GEMINI_API_KEY}

# Pinecone Settings
PINECONE_API_KEY=${PINECONE_API_KEY}

# Application Settings
ASPNETCORE_ENVIRONMENT=Production

# Next.js Client
NEXT_PUBLIC_API_URL=http://api:5000/api
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📄 Contents:"
echo "============================================"
cat .env
echo "============================================"
echo ""
echo "🔒 Security Note: This file contains sensitive information."
echo "   Make sure it's not accessible to unauthorized users."
echo ""
echo "Next steps:"
echo "1. Review the .env file: nano .env"
echo "2. Deploy with: docker-compose up -d"
echo ""
