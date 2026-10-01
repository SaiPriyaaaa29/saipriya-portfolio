---
name: Portfolio file downloads
description: Delivery constraint for downloadable files stored outside the web artifact.
---

For files stored in `attached_assets`, avoid linking directly to Vite's `/@fs` URL. Vite may build that import correctly, but the development URL is rejected by Replit's preview proxy. Keep the uploaded source intact and expose a portfolio-owned URL backed by a development middleware route and a production build asset.

**Why:** The resume's Vite filesystem URL caused “Replit refused to connect” when opened through the preview.

**How to apply:** For future portfolio downloads, use a URL within the artifact's preview path and verify both the development proxy response and the production asset.