# Azure Static Web Apps Deployment Checklist

Use this checklist to ensure your deployment is successful.

## Pre-Deployment Setup

### 1. Frontend Configuration

- [x] `next.config.ts` is configured correctly
- [x] `staticwebapp.config.json` is present
- [x] `.env.production` template created
- [x] GitHub Actions workflow created (`.github/workflows/azure-static-web-apps.yml`)
- [ ] All dependencies are in `package.json`
- [ ] Build works locally (`npm run build`)

### 2. Backend Configuration

- [ ] Azure App Service is running
- [ ] Backend API URL is known (e.g., `https://your-app.azurewebsites.net`)
- [ ] Backend health check passes (`curl https://your-app.azurewebsites.net/api/products`)
- [ ] Database connection is working

## Deployment Steps

### 3. Create Azure Static Web App

- [ ] Navigate to [Azure Portal](https://portal.azure.com)
- [ ] Create new Static Web App resource
- [ ] Configure GitHub integration
- [ ] Set build configuration:
  - App location: `/clientv2`
  - Output location: `.next`
  - Branch: `deploy`
- [ ] Wait for resource creation to complete

### 4. Configure GitHub Secrets

- [ ] Get deployment token from Azure Static Web App
- [ ] Add to GitHub repository secrets:
  - [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN`
  - [ ] `NEXT_PUBLIC_API_URL` (your backend URL)

### 5. Configure Environment Variables

- [ ] In Azure Static Web App → Configuration → Application settings:
  - [ ] Add `NEXT_PUBLIC_API_URL` = `https://your-backend.azurewebsites.net/api`

### 6. Update Backend CORS

- [ ] In Azure App Service → Configuration → Application settings:
  - [ ] Update `CORS_ORIGIN` to include Static Web App URL
  - [ ] Example: `http://localhost:3000,https://your-app.azurestaticapps.net`
- [ ] Save and restart backend

## Post-Deployment Testing

### 7. Verify GitHub Actions

- [ ] Go to GitHub → Actions tab
- [ ] Check that workflow ran successfully
- [ ] Review build logs for any errors

### 8. Test Frontend

- [ ] Open Static Web App URL
- [ ] Page loads correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] No console errors

### 9. Test API Integration

- [ ] Products load on catalog page
- [ ] Search functionality works
- [ ] User registration works
- [ ] User login works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Admin features work (if applicable)

### 10. Test Authentication

- [ ] Login with existing account
- [ ] Logout works
- [ ] Protected routes require authentication
- [ ] Cookies persist across pages
- [ ] Session remains after page refresh

### 11. Performance Check

- [ ] Page load time is acceptable
- [ ] Images load without delay
- [ ] API responses are fast
- [ ] No network errors in developer tools

## Production Optimization

### 12. Security

- [ ] HTTPS is enforced on both frontend and backend
- [ ] CORS is restricted to specific domains (no wildcards)
- [ ] Sensitive data is not exposed in client-side code
- [ ] Environment variables are properly secured

### 13. Monitoring

- [ ] Enable Application Insights on Static Web App
- [ ] Enable Application Insights on App Service
- [ ] Set up alerts for errors
- [ ] Configure log retention

### 14. Custom Domain (Optional)

- [ ] Purchase/configure custom domain
- [ ] Add custom domain to Static Web App
- [ ] Update DNS records
- [ ] Verify SSL certificate
- [ ] Update CORS_ORIGIN to include custom domain

### 15. Final Checks

- [ ] Test from different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Test with slow network connection
- [ ] Verify all features work in production
- [ ] Check for broken links

## Troubleshooting

If something doesn't work, check:

1. **GitHub Actions Logs** - Look for build errors
2. **Browser Console** - Check for JavaScript/network errors
3. **Network Tab** - Verify API calls are going to correct URL
4. **Azure Portal Logs** - Check both Static Web App and App Service logs
5. **CORS Headers** - Use browser dev tools to verify CORS headers are present

## Quick Access Links

- **Azure Portal**: https://portal.azure.com
- **GitHub Actions**: https://github.com/lakshanabenayake/Re-Store/actions
- **Azure Static Web Apps Docs**: https://docs.microsoft.com/azure/static-web-apps/
- **Next.js Deployment Docs**: https://nextjs.org/docs/deployment

## Support Contacts

- Azure Support: https://azure.microsoft.com/support/
- GitHub Support: https://support.github.com/
- Next.js Community: https://github.com/vercel/next.js/discussions

## Environment URLs

### Development

- Frontend: http://localhost:3000
- Backend: http://localhost:5001/api

### Production

- Frontend: https://[your-app].azurestaticapps.net
- Backend: https://[your-backend].azurewebsites.net/api

---

**Note**: Save this checklist and check off items as you complete them. Keep the URLs handy for future reference.
