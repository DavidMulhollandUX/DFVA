#!/bin/bash
# deploy-server.sh — Build and deploy the Wasp SERVER (backend) to Fly.io.
# Pairs with deploy-vercel.sh (frontend). Run both via ./deploy.sh so the
# frontend and backend can never drift out of sync (the #1 outage cause).
#
# Why the emailSender dance: main.wasp.ts keeps `provider: "Dummy"` for local
# dev, but Wasp forbids Dummy in a production build. The live Fly app already
# holds the SMTP_* secrets, so we flip to SMTP for the build and revert on exit.
set -e

APP="compass-server-sxd"
BUILD_DIR=".wasp/out"
# The canonical production frontend origin. Wasp uses WASP_WEB_CLIENT_URL as
# the ONLY allowed CORS origin, so if this drifts from the domain users
# actually load the site from, every logged-in page breaks with a silent
# "Network Error" (browser blocks the response, no server-side error to spot).
CLIENT_URL="${WASP_WEB_CLIENT_URL:-https://evidura.ai}"

echo "🔗 Syncing WASP_WEB_CLIENT_URL secret → $CLIENT_URL (staged, applies with this deploy)..."
fly secrets set -a "$APP" WASP_WEB_CLIENT_URL="$CLIENT_URL" --stage

echo "📧 Temporarily switching emailSender Dummy → SMTP for the prod build..."
# Revert main.wasp no matter how the script exits (success, error, or Ctrl-C).
trap 'echo "↩️  Reverting main.wasp.ts emailSender → Dummy"; git checkout -- main.wasp.ts 2>/dev/null || true' EXIT
sed -i '' 's/provider: "Dummy",/provider: "SMTP",/' main.wasp.ts

echo "🔨 wasp build (compiles server + client into .wasp/out)..."
wasp build

echo "🐳 Deploying server image to Fly app '$APP'..."
( cd "$BUILD_DIR" && fly config save -a "$APP" -y >/dev/null && fly deploy -a "$APP" --remote-only )

echo "✅ Server deployed: https://$APP.fly.dev/"
