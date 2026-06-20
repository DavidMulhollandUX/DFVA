#!/bin/bash
# deploy-vercel.sh — Build and deploy the Wasp frontend to Vercel
# Usage: ./deploy-vercel.sh
set -e

BUILD_DIR=".wasp/out/web-app/build"
API_URL="${REACT_APP_API_URL:-https://compass-server-sxd.fly.dev}"

echo "🔨 Building frontend (API → $API_URL)..."
REACT_APP_API_URL="$API_URL" npx vite build

echo "📝 Writing vercel.json SPA rewrite..."
cat > "$BUILD_DIR/vercel.json" << 'EOF'
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
EOF

echo "🚀 Deploying to Vercel..."
cd "$BUILD_DIR"
npx vercel --prod --yes

echo ""
echo "🔗 Updating alias → compass-curriculum.vercel.app"
DEPLOYMENT_URL=$(npx vercel ls --prod 2>/dev/null | grep "build" | head -1)
npx vercel alias set "$DEPLOYMENT_URL" compass-curriculum.vercel.app

echo ""
echo "✅ Done! https://compass-curriculum.vercel.app"
