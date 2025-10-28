#!/bin/bash

# Script to build and push Docker images to Docker Hub
# Usage: ./push-images.sh [version]
# Example: ./push-images.sh v1.0.0

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "======================================"
echo "Docker Image Build & Push Script"
echo "======================================"
echo ""

# Get version tag (default to 'latest')
VERSION=${1:-latest}
DOCKER_USERNAME="lakshanabenayake"
API_IMAGE="$DOCKER_USERNAME/restore-api"
CLIENT_IMAGE="$DOCKER_USERNAME/restore-client"

echo -e "${GREEN}Building images with tag: ${VERSION}${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Build API image
echo -e "${GREEN}[1/4] Building API image...${NC}"
cd API
docker build -t backend:${VERSION} .
docker tag backend:${VERSION} ${API_IMAGE}:${VERSION}
if [ "$VERSION" != "latest" ]; then
    docker tag backend:${VERSION} ${API_IMAGE}:latest
fi
cd ..
echo -e "${GREEN}✓ API image built${NC}"
echo ""

# Build Client image
echo -e "${GREEN}[2/4] Building Client image...${NC}"
cd client
docker build -t frontend:${VERSION} .
docker tag frontend:${VERSION} ${CLIENT_IMAGE}:${VERSION}
if [ "$VERSION" != "latest" ]; then
    docker tag frontend:${VERSION} ${CLIENT_IMAGE}:latest
fi
cd ..
echo -e "${GREEN}✓ Client image built${NC}"
echo ""

# Login to Docker Hub (if not already logged in)
echo -e "${GREEN}[3/4] Checking Docker Hub login...${NC}"
if ! docker info | grep -q "Username"; then
    echo "Please login to Docker Hub:"
    docker login
fi
echo ""

# Push images
echo -e "${GREEN}[4/4] Pushing images to Docker Hub...${NC}"
echo ""

echo "Pushing ${API_IMAGE}:${VERSION}..."
docker push ${API_IMAGE}:${VERSION}
if [ "$VERSION" != "latest" ]; then
    echo "Pushing ${API_IMAGE}:latest..."
    docker push ${API_IMAGE}:latest
fi
echo ""

echo "Pushing ${CLIENT_IMAGE}:${VERSION}..."
docker push ${CLIENT_IMAGE}:${VERSION}
if [ "$VERSION" != "latest" ]; then
    echo "Pushing ${CLIENT_IMAGE}:latest..."
    docker push ${CLIENT_IMAGE}:latest
fi
echo ""

echo -e "${GREEN}======================================"
echo "✓ All images pushed successfully!"
echo "======================================${NC}"
echo ""
echo "Images pushed:"
echo "  - ${API_IMAGE}:${VERSION}"
echo "  - ${CLIENT_IMAGE}:${VERSION}"
if [ "$VERSION" != "latest" ]; then
    echo "  - ${API_IMAGE}:latest"
    echo "  - ${CLIENT_IMAGE}:latest"
fi
echo ""
echo "View on Docker Hub:"
echo "  https://hub.docker.com/r/${DOCKER_USERNAME}/restore-api"
echo "  https://hub.docker.com/r/${DOCKER_USERNAME}/restore-client"
echo ""
echo -e "${YELLOW}To deploy on VPS:${NC}"
echo "  cd ~/restore-app"
echo "  docker-compose pull"
echo "  docker-compose up -d"
echo ""
