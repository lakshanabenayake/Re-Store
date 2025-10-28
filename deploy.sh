#!/bin/bash

# ReStore Deployment Script
# This script helps deploy the application to a VPS

set -e  # Exit on error

echo "======================================"
echo "ReStore Deployment Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.production..."
    cp .env.production .env
    print_warning "Please edit .env file with your secure passwords!"
    echo ""
    read -p "Press Enter after you've updated the .env file..."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are installed ✓"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Build and start all services"
echo "2) Stop all services"
echo "3) Restart all services"
echo "4) View logs"
echo "5) Rebuild and restart (after code changes)"
echo "6) Clean up everything (WARNING: deletes database)"
echo "7) Backup database"
echo "8) Exit"
echo ""
read -p "Enter your choice [1-8]: " choice

case $choice in
    1)
        print_status "Building and starting all services..."
        docker-compose up -d --build
        echo ""
        print_status "All services started successfully!"
        print_status "Frontend: http://localhost"
        print_status "API: http://localhost:5000"
        echo ""
        print_status "To view logs, run: docker-compose logs -f"
        ;;
    2)
        print_status "Stopping all services..."
        docker-compose down
        print_status "All services stopped."
        ;;
    3)
        print_status "Restarting all services..."
        docker-compose restart
        print_status "All services restarted."
        ;;
    4)
        print_status "Showing logs (press Ctrl+C to exit)..."
        docker-compose logs -f
        ;;
    5)
        print_status "Rebuilding and restarting services..."
        docker-compose up -d --build
        print_status "Services rebuilt and restarted."
        ;;
    6)
        print_warning "This will delete all containers, images, and volumes (including the database)!"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" == "yes" ]; then
            print_status "Cleaning up..."
            docker-compose down -v
            docker-compose down --rmi all
            print_status "Cleanup complete."
        else
            print_status "Cleanup cancelled."
        fi
        ;;
    7)
        print_status "Creating database backup..."
        BACKUP_DIR=./backups
        mkdir -p $BACKUP_DIR
        DATE=$(date +%Y%m%d_%H%M%S)
        
        # Get password from .env
        source .env
        
        docker exec restore-db /opt/mssql-tools/bin/sqlcmd \
            -S localhost -U sa -P "$DB_PASSWORD" \
            -Q "BACKUP DATABASE [RestoreDb] TO DISK = N'/var/opt/mssql/backup_$DATE.bak' WITH NOFORMAT, NOINIT, NAME = 'RestoreDb-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
        
        docker cp restore-db:/var/opt/mssql/backup_$DATE.bak $BACKUP_DIR/
        print_status "Backup completed: $BACKUP_DIR/backup_$DATE.bak"
        ;;
    8)
        print_status "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
print_status "Done!"
