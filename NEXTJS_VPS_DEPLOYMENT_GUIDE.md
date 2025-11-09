# Next.js VPS Deployment Guide

This guide covers deploying the migrated Next.js frontend (clientv2) to your VPS.

## What Changed

- **Frontend**: Migrated from React (Vite) to Next.js 15
- **Old folder**: `client` → **New folder**: `clientv2`
- **Port**: Changed from 80 (nginx) to 3000 (Next.js)
- **Docker**: Multi-stage build with standalone output

## Prerequisites

1. VPS with Docker and Docker Compose installed
2. Docker Hub account (already configured: lakshanabenayake)
3. GitHub repository secrets configured:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `VPS_HOST`
   - `VPS_USERNAME`
   - `VPS_SSH_KEY`

## Files Updated

### 1. GitHub Actions (`.github/workflows/deploy.yml`)

- ✅ Updated to build from `./clientv2` instead of `./client`
- ✅ Added explicit Dockerfile path

### 2. Docker Compose Files

- ✅ `docker-compose.yml` - Updated for local development
- ✅ `docker-compose.prod.yml` - Updated for production deployment
- ✅ Changed port mapping from `80:80` to `80:3000`
- ✅ Added Next.js environment variables

### 3. Next.js Dockerfile (`clientv2/Dockerfile`)

- ✅ Optimized multi-stage build
- ✅ Uses standalone output mode
- ✅ Non-root user for security
- ✅ Smaller image size

## Environment Variables

### On Your VPS

Create or update `~/restore-app/.env` file on your VPS:

```bash
# Database
DB_PASSWORD=YourStrong@Passw0rd
DB_NAME=RestoreDb

# API Environment Variables (add all your API keys here)
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GEMINI_API_KEY=your-gemini-key
PINECONE_API_KEY=your-pinecone-key
STRIPE_SECRET_KEY=your-stripe-key

# Frontend
NEXT_PUBLIC_API_URL=http://api:5000/api
```

### Update API CORS Settings

Make sure your API's `appsettings.json` or environment variables allow your VPS domain:

```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://your-vps-domain.com",
      "http://your-vps-ip"
    ]
  }
}
```

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Push to dev branch**:

   ```bash
   git add .
   git commit -m "Migrated to Next.js frontend"
   git push origin dev
   ```

2. **GitHub Actions will**:
   - Build both API and Client Docker images
   - Push them to Docker Hub
   - SSH into your VPS
   - Pull the latest images
   - Restart containers

### Option 2: Manual Deployment

If you need to deploy manually:

```bash
# 1. SSH into your VPS
ssh your-username@your-vps-ip

# 2. Navigate to the app directory
cd ~/restore-app

# 3. Pull the latest images
docker-compose -f docker-compose.prod.yml pull

# 4. Stop and remove old containers
docker-compose -f docker-compose.prod.yml down

# 5. Start new containers
docker-compose -f docker-compose.prod.yml up -d

# 6. Clean up old images
docker image prune -f

# 7. Check logs
docker-compose -f docker-compose.prod.yml logs -f client
```

## VPS Setup (First Time Only)

If this is your first time deploying to the VPS:

```bash
# 1. SSH into VPS
ssh your-username@your-vps-ip

# 2. Create app directory
mkdir -p ~/restore-app
cd ~/restore-app

# 3. Copy docker-compose.prod.yml to VPS
# On your local machine:
scp docker-compose.prod.yml your-username@your-vps-ip:~/restore-app/

# 4. Create .env file on VPS
nano .env
# (Add all environment variables as shown above)

# 5. Login to Docker Hub
docker login

# 6. Pull and start containers
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## Port Configuration

### Development (docker-compose.yml)

- Database: `1433:1433`
- API: `5000:5000`
- Client: `80:3000` (access at http://localhost)

### Production (VPS)

- Database: `1433:1433` (internal only)
- API: `5000:5000`
- Client: `80:3000` (access at http://your-vps-ip)

## Troubleshooting

### Check if containers are running

```bash
docker ps
```

### View client logs

```bash
docker logs restore-client
# or
docker-compose logs -f client
```

### View API logs

```bash
docker logs restore-api
# or
docker-compose logs -f api
```

### Restart specific service

```bash
docker-compose -f docker-compose.prod.yml restart client
```

### Check API connectivity from client

```bash
docker exec -it restore-client wget -O- http://api:5000/api/products
```

## Next.js Specific Issues

### Issue: API calls failing

**Solution**: Check `NEXT_PUBLIC_API_URL` environment variable

### Issue: Images not loading

**Solution**: Verify Cloudinary credentials in API environment variables

### Issue: 404 on refresh

**Solution**: Next.js handles this automatically with its built-in server

## Testing After Deployment

1. **Check if services are running**:

   ```bash
   docker ps
   ```

2. **Test API**:

   ```bash
   curl http://your-vps-ip:5000/api/products
   ```

3. **Test Frontend**:
   Open browser: `http://your-vps-ip`

4. **Test API from Frontend**:
   Check browser console for any CORS or connection errors

## Nginx Configuration (Optional)

If you want to use a domain name and SSL, set up Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then use Certbot for SSL:

```bash
sudo certbot --nginx -d your-domain.com
```

## Rollback Plan

If something goes wrong:

```bash
# Use a specific tagged version
docker-compose -f docker-compose.prod.yml pull lakshanabenayake/restore-client:previous-commit-sha
docker-compose -f docker-compose.prod.yml up -d
```

## Performance Optimization

The new Next.js setup includes:

- ✅ Standalone output (smaller image)
- ✅ Multi-stage Docker build
- ✅ Image optimization
- ✅ Automatic code splitting
- ✅ Server-side rendering (SSR)
- ✅ Static generation where possible

## Support

If you encounter issues:

1. Check container logs
2. Verify environment variables
3. Ensure API CORS settings are correct
4. Check network connectivity between containers
5. Verify Docker images are up to date

## Next Steps

1. ✅ Update GitHub secrets if needed
2. ✅ Update VPS environment variables
3. ✅ Update API CORS settings
4. ✅ Push changes to trigger deployment
5. ⏳ Monitor deployment in GitHub Actions
6. ⏳ Test the deployed application
7. ⏳ Set up domain name and SSL (optional)
