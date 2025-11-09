# Backend Configuration for Azure Static Web Apps

After deploying your frontend to Azure Static Web Apps, you need to configure your backend to accept requests from the new domain.

## Step 1: Get Your Static Web App URL

After deploying, your Static Web App URL will look like:

- `https://your-app-name.azurestaticapps.net`

OR if you added a custom domain:

- `https://www.yourdomain.com`

## Step 2: Update Backend CORS Configuration

### Option A: Update via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure App Service (backend)
3. Go to "Configuration" → "Application settings"
4. Find or add the `CORS_ORIGIN` setting
5. Update the value to include your Static Web App URLs (comma-separated):
   ```
   http://localhost:3000,https://your-app-name.azurestaticapps.net
   ```
6. Click "Save"
7. Restart your App Service

### Option B: Update via Azure CLI

```bash
# Set CORS origin
az webapp config appsettings set \
  --name your-backend-app-name \
  --resource-group your-resource-group \
  --settings CORS_ORIGIN="http://localhost:3000,https://your-app-name.azurestaticapps.net"

# Restart the app
az webapp restart \
  --name your-backend-app-name \
  --resource-group your-resource-group
```

### Option C: Support Multiple Origins in Code

If you need to support multiple origins dynamically, update `Program.cs`:

```csharp
// Get CORS origins from environment variable (comma-separated)
var corsOrigins = Environment.GetEnvironmentVariable("CORS_ORIGIN") ?? "http://localhost:3000";
var allowedOrigins = corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries);

Console.WriteLine($"Allowed CORS Origins: {string.Join(", ", allowedOrigins)}");

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()
       .WithOrigins(allowedOrigins);
});
```

## Step 3: Configure Cookie Settings for Cross-Origin

Your current cookie configuration looks good, but ensure these settings are correct:

```csharp
options.ApplicationCookie?.Configure(opt =>
{
    opt.Cookie.HttpOnly = true;
    opt.Cookie.SecurePolicy = CookieSecurePolicy.Always; // ✅ Required for HTTPS
    opt.Cookie.SameSite = SameSiteMode.None;             // ✅ Required for cross-origin
    opt.Cookie.Path = "/";
    opt.ExpireTimeSpan = TimeSpan.FromDays(7);
    opt.SlidingExpiration = true;
});
```

## Step 4: Verify CORS is Working

Test your CORS configuration:

```bash
# Test from command line
curl -H "Origin: https://your-app-name.azurestaticapps.net" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     https://your-backend-app.azurewebsites.net/api/products

# You should see these headers in response:
# Access-Control-Allow-Origin: https://your-app-name.azurestaticapps.net
# Access-Control-Allow-Credentials: true
```

## Step 5: Update Frontend Environment Variable

Make sure your frontend knows where your backend is:

### In Azure Static Web App:

1. Go to Azure Portal → Your Static Web App
2. Click "Configuration"
3. Add or update:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-app.azurewebsites.net/api`
4. Save and wait for the app to restart

### In GitHub Secrets (for CI/CD):

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add or update:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-app.azurewebsites.net/api`

## Common Issues and Solutions

### Issue: CORS errors in browser console

**Solution**:

- Check the `CORS_ORIGIN` environment variable includes your Static Web App URL
- Restart your backend App Service
- Clear browser cache

### Issue: Authentication not working

**Solution**:

- Ensure `SameSite=None` and `Secure=true` for cookies
- Verify `AllowCredentials()` is set in CORS policy
- Check that frontend is using `credentials: 'include'` in API calls

### Issue: 401 Unauthorized errors

**Solution**:

- Check that cookies are being sent with requests
- Verify the authentication middleware is before authorization
- Check cookie domain settings

## Testing Checklist

- [ ] Backend accepts requests from Static Web App URL
- [ ] CORS headers are present in responses
- [ ] Login/logout works correctly
- [ ] Authenticated endpoints work
- [ ] Images load correctly
- [ ] All API calls complete successfully

## Production Best Practices

1. **Use HTTPS only**: Ensure both frontend and backend use HTTPS
2. **Limit CORS origins**: Only allow specific domains, not wildcards
3. **Monitor CORS errors**: Set up Application Insights alerts
4. **Use custom domains**: More professional and better for SEO
5. **Enable rate limiting**: Protect your API from abuse

## Environment Variables Summary

### Backend (Azure App Service):

```
CORS_ORIGIN=http://localhost:3000,https://your-app-name.azurestaticapps.net
DB_SERVER=your-db-server.database.windows.net
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (Azure Static Web App):

```
NEXT_PUBLIC_API_URL=https://your-backend-app.azurewebsites.net/api
```
