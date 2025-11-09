#!/bin/bash

# Quick deployment script for Next.js migration
# Usage: ./deploy-nextjs.sh

set -e

echo "🚀 ReStore Next.js Deployment Script"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}Error: Please run this script from the ReStore root directory${NC}"
    exit 1
fi

# Check if clientv2 exists
if [ ! -d "clientv2" ]; then
    echo -e "${RED}Error: clientv2 directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found clientv2 directory"

# Check if Dockerfile exists
if [ ! -f "clientv2/Dockerfile" ]; then
    echo -e "${RED}Error: clientv2/Dockerfile not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found clientv2/Dockerfile"

# Function to test local build
test_local_build() {
    echo ""
    echo "📦 Testing local Docker build..."
    echo "================================"
    
    cd clientv2
    if docker build -t restore-client-test .; then
        echo -e "${GREEN}✓${NC} Local Docker build successful"
        cd ..
        return 0
    else
        echo -e "${RED}✗${NC} Local Docker build failed"
        cd ..
        return 1
    fi
}

# Function to test docker-compose
test_docker_compose() {
    echo ""
    echo "🐳 Testing docker-compose..."
    echo "============================"
    
    echo "Stopping any running containers..."
    docker-compose down
    
    echo "Building and starting services..."
    if docker-compose up -d --build; then
        echo -e "${GREEN}✓${NC} Docker Compose started successfully"
        echo ""
        echo "Waiting 10 seconds for services to initialize..."
        sleep 10
        
        echo ""
        echo "Container status:"
        docker-compose ps
        
        echo ""
        echo -e "${YELLOW}Testing endpoints:${NC}"
        echo "- API: http://localhost:5000/api/products"
        echo "- Frontend: http://localhost"
        
        return 0
    else
        echo -e "${RED}✗${NC} Docker Compose failed"
        return 1
    fi
}

# Function to push to GitHub
push_to_github() {
    echo ""
    echo "📤 Pushing to GitHub..."
    echo "======================"
    
    # Check if there are changes
    if [[ -z $(git status -s) ]]; then
        echo -e "${YELLOW}No changes to commit${NC}"
        return 0
    fi
    
    echo "Current changes:"
    git status -s
    
    echo ""
    read -p "Do you want to commit and push these changes? (y/n) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " commit_message
        
        if [ -z "$commit_message" ]; then
            commit_message="Deploy Next.js migration"
        fi
        
        git add .
        git commit -m "$commit_message"
        git push origin dev
        
        echo -e "${GREEN}✓${NC} Pushed to GitHub"
        echo ""
        echo "🎯 GitHub Actions will now:"
        echo "  1. Build Docker images"
        echo "  2. Push to Docker Hub"
        echo "  3. Deploy to VPS"
        echo ""
        echo "Monitor progress at:"
        echo "https://github.com/lakshanabenayake/Re-Store/actions"
        
        return 0
    else
        echo "Skipping push to GitHub"
        return 1
    fi
}

# Function to show manual deployment instructions
show_manual_deployment() {
    echo ""
    echo "📖 Manual VPS Deployment Instructions"
    echo "====================================="
    echo ""
    echo "1. SSH into your VPS:"
    echo "   ssh your-username@your-vps-ip"
    echo ""
    echo "2. Navigate to app directory:"
    echo "   cd ~/restore-app"
    echo ""
    echo "3. Pull latest images:"
    echo "   docker-compose -f docker-compose.prod.yml pull"
    echo ""
    echo "4. Restart containers:"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
    echo ""
    echo "5. Clean up:"
    echo "   docker image prune -f"
    echo ""
    echo "6. Check logs:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f client"
    echo ""
}

# Main menu
show_menu() {
    echo ""
    echo "What would you like to do?"
    echo "=========================="
    echo "1. Test local Docker build only"
    echo "2. Test docker-compose locally"
    echo "3. Push to GitHub (trigger deployment)"
    echo "4. Show manual deployment instructions"
    echo "5. Run all tests then push"
    echo "6. Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            test_local_build
            show_menu
            ;;
        2)
            test_docker_compose
            show_menu
            ;;
        3)
            push_to_github
            show_menu
            ;;
        4)
            show_manual_deployment
            show_menu
            ;;
        5)
            if test_local_build && test_docker_compose; then
                echo -e "${GREEN}✓${NC} All tests passed!"
                push_to_github
            else
                echo -e "${RED}✗${NC} Tests failed. Please fix errors before deploying."
            fi
            show_menu
            ;;
        6)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            show_menu
            ;;
    esac
}

# Start the script
echo "This script will help you deploy the Next.js migration."
echo ""

show_menu
