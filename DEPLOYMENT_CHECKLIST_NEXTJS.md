# Next.js Migration Deployment Checklist

## ✅ Files Already Updated

- [x] `.github/workflows/deploy.yml` - Updated to build from `clientv2`
- [x] `docker-compose.yml` - Updated client service for Next.js
- [x] `docker-compose.prod.yml` - Updated for production
- [x] `clientv2/Dockerfile` - Optimized multi-stage build
- [x] `clientv2/.dockerignore` - Added for efficient builds
- [x] `clientv2/.env.example` - Created template

## 📋 Before First Deployment

### 1. Local Testing

```bash
# Test Docker build locally
cd clientv2
docker build -t restore-client-test .

# Test docker-compose locally
cd ..
docker-compose down
docker-compose up --build
```

### 2. VPS Preparation

- [ ] Copy `docker-compose.prod.yml` to VPS `~/restore-app/`
- [ ] Create `.env` file on VPS with all environment variables
- [ ] Update `NEXT_PUBLIC_API_URL` in VPS `.env`
- [ ] Ensure Docker and Docker Compose are installed on VPS

### 3. API Configuration

- [ ] Update API CORS settings to allow VPS domain/IP
- [ ] Verify all API environment variables are set on VPS
- [ ] Check API is accessible from VPS network

### 4. GitHub Secrets (Verify these exist)

- [ ] `DOCKER_USERNAME` - Docker Hub username
- [ ] `DOCKER_PASSWORD` - Docker Hub password/token
- [ ] `VPS_HOST` - Your VPS IP or domain
- [ ] `VPS_USERNAME` - SSH username for VPS
- [ ] `VPS_SSH_KEY` - Private SSH key for VPS access

## 🚀 Deployment Commands

### Push to trigger automatic deployment

```bash
git add .
git commit -m "Deploy Next.js migration"
git push origin dev
```

### Manual deployment on VPS

```bash
ssh your-username@your-vps-ip
cd ~/restore-app
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
docker image prune -f
```

## 🧪 Post-Deployment Testing

- [ ] Check GitHub Actions workflow completed successfully
- [ ] Verify containers are running: `docker ps`
- [ ] Test API endpoint: `curl http://your-vps-ip:5000/api/products`
- [ ] Test frontend: Open `http://your-vps-ip` in browser
- [ ] Check browser console for errors
- [ ] Test a complete user flow (browse, add to cart, checkout)
- [ ] Verify images load correctly
- [ ] Test authentication flow

## 🔍 Quick Diagnostics

```bash
# Check all containers
docker ps -a

# View client logs
docker logs restore-client --tail 100 -f

# View API logs
docker logs restore-api --tail 100 -f

# Check container networking
docker network ls
docker network inspect restore-network

# Test API from client container
docker exec -it restore-client wget -O- http://api:5000/api/products

# Restart services
docker-compose -f docker-compose.prod.yml restart client
```

## 🛠️ Common Issues & Fixes

### Client container exits immediately

```bash
# Check logs
docker logs restore-client

# Common causes:
# - Missing .env variables
# - Build failed
# - Port conflict

# Fix: Rebuild
docker-compose -f docker-compose.prod.yml up --build -d client
```

### API connection errors

```bash
# Check if API is accessible
docker exec -it restore-client wget -O- http://api:5000/api/products

# Fix: Update NEXT_PUBLIC_API_URL
# Edit .env on VPS and restart client
docker-compose -f docker-compose.prod.yml restart client
```

### CORS errors

```bash
# Update API appsettings.json or environment variables
# Add your VPS IP/domain to allowed origins
# Restart API
docker-compose -f docker-compose.prod.yml restart api
```

## 📊 Environment Variables Reference

### VPS .env file should contain:

```bash
# Database
DB_PASSWORD=YourStrong@Passw0rd
DB_NAME=RestoreDb

# API URLs
NEXT_PUBLIC_API_URL=http://api:5000/api

# API Keys (add all your actual keys)
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GEMINI_API_KEY=your-gemini-key
PINECONE_API_KEY=your-pinecone-key
STRIPE_SECRET_KEY=your-stripe-key
```

## 📝 Important Notes

1. **Port Change**: Frontend now runs on port 3000 (not 80 internally)

   - Mapped as `80:3000` so you still access via port 80

2. **Folder Change**: `client` → `clientv2`

   - Old React app removed
   - New Next.js app in clientv2

3. **Build Time**: Next.js build may take longer than React

   - Multi-stage Docker build optimizes final image size
   - First build will be slower, subsequent builds use cache

4. **Environment Variables**: Next.js requires `NEXT_PUBLIC_` prefix

   - Client-side variables must start with `NEXT_PUBLIC_`
   - Server-side variables don't need this prefix

5. **Routing**: Next.js uses file-based routing
   - No need for client-side router configuration
   - All routes handled by Next.js automatically

## ✅ Success Indicators

You'll know deployment succeeded when:

- ✅ GitHub Actions workflow shows green checkmark
- ✅ `docker ps` shows all 3 containers running
- ✅ Opening `http://your-vps-ip` shows your Next.js app
- ✅ Products load on the catalog page
- ✅ No CORS errors in browser console
- ✅ Images display correctly
- ✅ Authentication works

## 🎯 Next Steps After Successful Deployment

1. Set up domain name (optional)
2. Configure SSL/HTTPS with Let's Encrypt
3. Set up monitoring (e.g., Uptime Robot)
4. Configure automated backups for database
5. Set up logging and error tracking
