# Deploying Frontend to Azure Static Web Apps

This guide will help you deploy your Next.js frontend to Azure Static Web Apps.

## Prerequisites

- Azure account with an active subscription
- GitHub repository with your code
- Azure App Service backend already deployed

## Deployment Steps

### Option 1: Deploy via Azure Portal (Recommended for First Time)

1. **Create Azure Static Web App**

   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource"
   - Search for "Static Web Apps" and select it
   - Click "Create"

2. **Configure Basic Settings**

   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: Choose a unique name (e.g., `restore-frontend`)
   - **Plan type**: Free (for development) or Standard (for production)
   - **Region**: Choose closest to your users
   - **Source**: Select "GitHub"

3. **Connect to GitHub**

   - Click "Sign in with GitHub"
   - Authorize Azure Static Web Apps
   - Select your repository: `lakshanabenayake/Re-Store`
   - Select branch: `deploy`

4. **Configure Build Details**

   - **Build Presets**: Select "Next.js"
   - **App location**: `/clientv2`
   - **Api location**: Leave empty (we're using separate Azure App Service)
   - **Output location**: `.next`

5. **Review and Create**

   - Click "Review + create"
   - Click "Create"
   - Wait for deployment to complete (2-3 minutes)

6. **Configure Environment Variables**

   - After deployment, go to your Static Web App resource
   - Click "Configuration" in the left menu
   - Click "Application settings"
   - Add the following:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://your-backend-app.azurewebsites.net/api` (replace with your actual Azure App Service URL)
   - Click "Save"

7. **Get Deployment Token (for manual deployments)**
   - In your Static Web App, go to "Overview"
   - Click "Manage deployment token"
   - Copy the token
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Create a new repository secret:
     - **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
     - **Value**: Paste the deployment token
   - Add another secret:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: Your backend API URL

### Option 2: Deploy via Azure CLI

```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create --name ReStore-Frontend --location eastus

# Create Static Web App
az staticwebapp create \
  --name restore-frontend \
  --resource-group ReStore-Frontend \
  --source https://github.com/lakshanabenayake/Re-Store \
  --location eastus \
  --branch deploy \
  --app-location "/clientv2" \
  --output-location ".next" \
  --login-with-github

# Set environment variables
az staticwebapp appsettings set \
  --name restore-frontend \
  --setting-names NEXT_PUBLIC_API_URL=https://your-backend-app.azurewebsites.net/api
```

## Automatic Deployments

Once set up, GitHub Actions will automatically:

- Deploy when you push to the `deploy` or `main` branch
- Create preview deployments for pull requests
- Clean up when pull requests are closed

## Manual Deployment

If you need to deploy manually:

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Build your app
cd clientv2
npm run build

# Deploy using SWA CLI
swa deploy --app-location . --output-location .next --deployment-token <YOUR_TOKEN>
```

## Verifying Deployment

1. **Check GitHub Actions**

   - Go to your repository → Actions tab
   - You should see a workflow run for "Azure Static Web Apps CI/CD"
   - Wait for it to complete (green checkmark)

2. **Access Your Site**
   - Go to Azure Portal → Your Static Web App → Overview
   - Click on the URL (e.g., `https://nice-rock-0a1b2c3d4.azurestaticapps.net`)
   - Your site should load!

## Updating Backend URL

If you need to update your backend API URL:

1. Go to Azure Portal → Your Static Web App
2. Click "Configuration"
3. Update the `NEXT_PUBLIC_API_URL` value
4. Click "Save"
5. The app will restart automatically

## Custom Domain (Optional)

1. Go to Azure Portal → Your Static Web App
2. Click "Custom domains"
3. Click "Add"
4. Follow the instructions to add your domain
5. Add the required DNS records

## Troubleshooting

### Build Fails

- Check GitHub Actions logs for errors
- Ensure all dependencies are in `package.json`
- Verify `next.config.ts` is correct

### API Calls Failing

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on your backend
- Ensure your backend is running

### 404 Errors

- Check `staticwebapp.config.json` navigationFallback settings
- Verify build output location is correct

### Images Not Loading

- Check `next.config.ts` image configuration
- Verify Cloudinary URLs are accessible
- Check image domain whitelist

## CORS Configuration on Backend

Make sure your Azure App Service backend allows requests from your Static Web App domain:

```csharp
// In your Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://your-static-web-app.azurestaticapps.net",
            "http://localhost:3000" // for local development
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

## Monitoring and Logs

- **Application Insights**: Enable for monitoring
- **Logs**: Check in Azure Portal → Static Web App → Monitoring → Log stream
- **Analytics**: View usage in Azure Portal → Static Web App → Metrics

## Cost Optimization

- **Free Tier**: Good for development, includes:
  - 100 GB bandwidth/month
  - 2 custom domains
  - Built-in SSL
- **Standard Tier**: For production, includes:
  - 100 GB bandwidth/month (then pay-as-you-go)
  - Unlimited custom domains
  - SLA guarantee

## Next Steps

1. ✅ Configure backend CORS
2. ✅ Set up custom domain (optional)
3. ✅ Enable Application Insights
4. ✅ Set up staging environments
5. ✅ Configure authentication (if needed)

## Support

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [GitHub Actions for Azure](https://github.com/Azure/static-web-apps-deploy)
