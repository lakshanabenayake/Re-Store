#!/bin/bash

# Update Backend CORS for Azure Static Web App
# This script updates your Azure App Service to accept requests from your frontend

echo "🔧 Updating Backend CORS Configuration..."
echo ""

# Your backend App Service name
APP_SERVICE_NAME="restore-api-gyg2a4h2dnandvb6"

# Your Static Web App URL
STATIC_WEB_APP_URL="https://brave-rock-0f79dac0f.azurestaticapps.net"

# Allowed origins (including localhost for development)
CORS_ORIGINS="http://localhost:3000,${STATIC_WEB_APP_URL}"

echo "App Service: ${APP_SERVICE_NAME}"
echo "Allowed Origins: ${CORS_ORIGINS}"
echo ""

# You need to find your resource group first
echo "Finding resource group..."
RESOURCE_GROUP=$(az webapp show --name ${APP_SERVICE_NAME} --query "resourceGroup" -o tsv 2>/dev/null)

if [ -z "$RESOURCE_GROUP" ]; then
    echo "❌ Could not find resource group automatically."
    echo "Please run this command manually:"
    echo ""
    echo "az webapp config appsettings set \\"
    echo "  --name ${APP_SERVICE_NAME} \\"
    echo "  --resource-group YOUR_RESOURCE_GROUP \\"
    echo "  --settings CORS_ORIGIN=\"${CORS_ORIGINS}\""
    echo ""
    echo "Then restart:"
    echo "az webapp restart --name ${APP_SERVICE_NAME} --resource-group YOUR_RESOURCE_GROUP"
    exit 1
fi

echo "Resource Group: ${RESOURCE_GROUP}"
echo ""

# Update CORS setting
echo "Updating CORS_ORIGIN setting..."
az webapp config appsettings set \
  --name ${APP_SERVICE_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --settings CORS_ORIGIN="${CORS_ORIGINS}" \
  --output table

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ CORS setting updated successfully!"
    echo ""
    echo "Restarting app service..."
    az webapp restart --name ${APP_SERVICE_NAME} --resource-group ${RESOURCE_GROUP}
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ App service restarted successfully!"
        echo ""
        echo "🎉 Backend is now configured to accept requests from:"
        echo "   - http://localhost:3000 (development)"
        echo "   - ${STATIC_WEB_APP_URL} (production)"
    else
        echo "❌ Failed to restart app service"
        exit 1
    fi
else
    echo "❌ Failed to update CORS setting"
    exit 1
fi
