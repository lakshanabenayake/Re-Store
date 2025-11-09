# Complete VPS Docker-Compose Configuration

This is the **COMPLETE** docker-compose.yml file you need on your VPS with all environment variables.

## 📋 Complete docker-compose.yml for VPS

```yaml
version: "3.8"

services:
  # SQL Server Database
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: restore-db
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=${DB_PASSWORD}
      - MSSQL_PID=Express
    ports:
      - "1434:1433"
    volumes:
      - restore-sql-data:/var/opt/mssql
    networks:
      - restore-network
    healthcheck:
      test:
        [
          "CMD-SHELL",
          '/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "${DB_PASSWORD}" -Q "SELECT 1" -C || exit 1',
        ]
      interval: 10s
      timeout: 3s
      retries: 10
      start_period: 30s

  # ASP.NET Core API
  api:
    image: lakshanabenayake/restore-api:latest
    container_name: restore-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - DB_SERVER=db
      - DB_PORT=1433
      - DB_NAME=${DB_NAME}
      - DB_USER=sa
      - DB_PASSWORD=${DB_PASSWORD}
      - CORS_ORIGIN=${CORS_ORIGIN}
      - STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - PINECONE_API_KEY=${PINECONE_API_KEY}
    ports:
      - "5000:5000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - restore-network
    restart: unless-stopped

  # Next.js Client
  client:
    image: lakshanabenayake/restore-client:latest
    container_name: restore-client
    environment:
      - NEXT_PUBLIC_API_URL=http://api:5000/api
    ports:
      - "80:3000"
    depends_on:
      - api
    networks:
      - restore-network
    restart: unless-stopped

volumes:
  restore-sql-data:
    external: true

networks:
  restore-network:
    driver: bridge
```

## 📝 Complete .env File for VPS

Create this file at `~/restore-app/.env`:

```bash
# ============================================
# ReStore Production Environment Variables
# ============================================

# Database Configuration
DB_SERVER=db
DB_PORT=1433
DB_NAME=shop                          # Or your database name
DB_USER=sa
DB_PASSWORD=pWordstrong@2002          # Your actual DB password

# CORS Configuration
CORS_ORIGIN=http://your-vps-ip        # REPLACE with your VPS IP or domain

# Stripe Settings (REPLACE with your actual keys)
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Cloudinary Settings (REPLACE with your actual keys)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Gemini API Settings (REPLACE with your actual key)
GEMINI_API_KEY=AIzaSy_YOUR_GEMINI_API_KEY

# Pinecone Settings (REPLACE with your actual key)
PINECONE_API_KEY=pcsk_YOUR_PINECONE_API_KEY

# Application Settings
ASPNETCORE_ENVIRONMENT=Production

# Next.js Client
NEXT_PUBLIC_API_URL=http://api:5000/api
```

## 🚀 Setup Instructions

### Option 1: Manual Setup

#### Step 1: Update docker-compose.yml

```bash
ssh your-username@your-vps-ip
cd ~/restore-app

# Backup existing file
cp docker-compose.yml docker-compose.yml.backup

# Edit the file
nano docker-compose.yml
# Paste the complete docker-compose.yml from above
# Save: Ctrl+X, Y, Enter
```

#### Step 2: Update .env file

```bash
# Backup existing .env
cp .env .env.backup

# Edit .env
nano .env
# Paste the complete .env from above
# IMPORTANT: Replace 'your-vps-ip' with your actual VPS IP
# Save: Ctrl+X, Y, Enter
```

#### Step 3: Deploy

```bash
# Pull latest images
docker-compose pull

# Restart services
docker-compose down
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Option 2: Using Scripts

#### Copy files from local machine:

```bash
# From your local machine
cd /d/projects/ReStore

# Copy docker-compose file
scp docker-compose.prod.yml your-username@your-vps-ip:~/restore-app/docker-compose.yml

# Copy environment setup script
scp setup-vps-env.sh your-username@your-vps-ip:~/restore-app/

# SSH into VPS
ssh your-username@your-vps-ip
cd ~/restore-app

# Run the setup script to create .env
chmod +x setup-vps-env.sh
./setup-vps-env.sh

# Deploy
docker-compose pull
docker-compose up -d
```

## ✅ Environment Variables Included

All these environment variables are now passed to the API container:

| Variable                 | Purpose               | Required              |
| ------------------------ | --------------------- | --------------------- |
| `DB_SERVER`              | Database host         | ✅ Yes                |
| `DB_PORT`                | Database port         | ✅ Yes                |
| `DB_NAME`                | Database name         | ✅ Yes                |
| `DB_USER`                | Database user         | ✅ Yes                |
| `DB_PASSWORD`            | Database password     | ✅ Yes                |
| `CORS_ORIGIN`            | Allowed CORS origins  | ✅ Yes                |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key     | ✅ Yes (for payments) |
| `STRIPE_SECRET_KEY`      | Stripe secret key     | ✅ Yes (for payments) |
| `STRIPE_WEBHOOK_SECRET`  | Stripe webhook secret | ✅ Yes (for payments) |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary account    | ✅ Yes (for images)   |
| `CLOUDINARY_API_KEY`     | Cloudinary API key    | ✅ Yes (for images)   |
| `CLOUDINARY_API_SECRET`  | Cloudinary secret     | ✅ Yes (for images)   |
| `GEMINI_API_KEY`         | Google Gemini API     | ✅ Yes (for AI chat)  |
| `PINECONE_API_KEY`       | Pinecone vector DB    | ✅ Yes (for search)   |
| `ASPNETCORE_ENVIRONMENT` | App environment       | ✅ Yes                |
| `NEXT_PUBLIC_API_URL`    | API URL for client    | ✅ Yes                |

## 🔍 Verification

After deploying, verify everything works:

```bash
# 1. Check all containers are running
docker ps
# Should show: restore-db, restore-api, restore-client

# 2. Check API has environment variables
docker exec restore-api printenv | grep -E "STRIPE|CLOUDINARY|GEMINI|PINECONE"

# 3. Test API endpoint
curl http://localhost:5000/api/products

# 4. Check client can reach API
docker exec restore-client wget -O- http://api:5000/api/products

# 5. View logs for any errors
docker-compose logs -f api
docker-compose logs -f client
```

## ⚠️ Important Notes

1. **CORS_ORIGIN**: Must include your VPS IP or domain

   ```bash
   # Single origin:
   CORS_ORIGIN=http://your-vps-ip

   # Multiple origins (comma-separated):
   CORS_ORIGIN=http://your-vps-ip,http://your-domain.com,https://your-domain.com
   ```

2. **Database Connection**: The API uses `db` as hostname (Docker internal network)

   - Port `1434` is exposed externally
   - Port `1433` is used internally

3. **Client API URL**: Uses internal Docker network (`http://api:5000/api`)

   - This is for server-side requests
   - Browser requests go directly to your VPS

4. **Security**: All sensitive keys are in `.env` file
   - Never commit `.env` to git
   - Set proper file permissions: `chmod 600 .env`

## 🔧 Troubleshooting

### API can't connect to database

```bash
# Check DB is healthy
docker-compose ps db

# Check connection from API
docker exec restore-api ping db
```

### Missing environment variables

```bash
# Check API environment
docker exec restore-api printenv

# Restart API to reload env
docker-compose restart api
```

### CORS errors

```bash
# Check CORS_ORIGIN is set correctly
docker exec restore-api printenv | grep CORS_ORIGIN

# Should match your VPS IP/domain
```

### Client can't reach API

```bash
# Check internal network
docker network inspect restore-network

# Test from client
docker exec restore-client wget -O- http://api:5000/api/products
```

## 📊 What Changed from Old Setup

| Aspect              | Old (React) | New (Next.js)             |
| ------------------- | ----------- | ------------------------- |
| **Client Port**     | `80:80`     | `80:3000`                 |
| **API Env Vars**    | Only 5 vars | All 14 vars ✅            |
| **Client Env Vars** | None        | `NEXT_PUBLIC_API_URL`     |
| **DB Port**         | Various     | Standardized to 1434:1433 |

## ✅ Next Steps

1. Copy the complete docker-compose.yml to VPS
2. Update the .env file on VPS with your values
3. Replace `your-vps-ip` with actual IP in CORS_ORIGIN
4. Run `docker-compose pull && docker-compose up -d`
5. Test your application
6. Monitor logs for any errors

---

**Last Updated**: November 9, 2025  
**Migration**: React → Next.js Complete with All Environment Variables ✅
