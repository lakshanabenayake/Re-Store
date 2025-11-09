# 🚀 Quick Start: Deploy to Azure Static Web Apps

## What's Ready

✅ Configuration files created
✅ GitHub Actions workflow set up
✅ Documentation prepared

## Deploy Now (5 Minutes)

### Step 1: Create Static Web App

1. Go to [Azure Portal](https://portal.azure.com) → Create Resource
2. Search "Static Web Apps" → Create
3. Fill in:
   - **Name**: `restore-frontend` (or your choice)
   - **Region**: Choose closest to your users
   - **Source**: GitHub
   - **Repository**: `lakshanabenayake/Re-Store`
   - **Branch**: `deploy`
   - **App location**: `/clientv2`
   - **Output location**: `.next`
4. Click "Create" (takes 2-3 minutes)

### Step 2: Configure Environment Variable

1. In your new Static Web App → Configuration
2. Add Application Setting:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend.azurewebsites.net/api` ⚠️ Replace with your actual backend URL
3. Save

### Step 3: Update Backend CORS

1. Go to your App Service (backend)
2. Configuration → Application settings
3. Update `CORS_ORIGIN`:
   - Find your Static Web App URL (like `https://nice-rock-123.azurestaticapps.net`)
   - Set value to: `http://localhost:3000,https://your-static-app-url.azurestaticapps.net`
4. Save and Restart

### Step 4: Add GitHub Secrets

1. GitHub → Your repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` (get from Azure Portal → Static Web App → Manage deployment token)
   - `NEXT_PUBLIC_API_URL` (your backend URL)

### Step 5: Deploy!

1. GitHub Actions will automatically deploy when you push to `deploy` branch
2. OR manually trigger: GitHub → Actions → "Azure Static Web Apps CI/CD" → Run workflow
3. Wait 2-3 minutes
4. Visit your Static Web App URL! 🎉

## Verify It Works

- [ ] Open your Static Web App URL
- [ ] Products page loads
- [ ] Can login/register
- [ ] Cart works
- [ ] Images display

## If Something Goes Wrong

1. Check GitHub Actions logs
2. Check browser console for errors
3. Verify `NEXT_PUBLIC_API_URL` is correct
4. Verify CORS is configured on backend
5. See full troubleshooting in `DEPLOYMENT_GUIDE_FRONTEND.md`

## Files Created

- `.github/workflows/azure-static-web-apps.yml` - Auto deployment
- `clientv2/staticwebapp.config.json` - Static Web App config
- `clientv2/.env.production` - Production env template
- `DEPLOYMENT_GUIDE_FRONTEND.md` - Detailed guide
- `BACKEND_CORS_CONFIG.md` - Backend setup guide
- `DEPLOYMENT_CHECKLIST.md` - Full checklist
- `deploy-frontend.sh` - Helper script (optional)

## Need Help?

See `DEPLOYMENT_GUIDE_FRONTEND.md` for detailed instructions and troubleshooting.

---

**Your backend is on Azure App Service ✅**  
**Now deploy your frontend to Azure Static Web Apps! 🚀**
