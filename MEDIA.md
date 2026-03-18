# Media Assets (GIFs, MP4s, etc.)

Large media files live in Cloudflare R2, not in this repo.

## Bucket

- **Bucket name:** `nteractio-blobs`
- **Cloudflare account:** Runt Prototype (`1cfb529b94b3d6cde3aaf49d1d6ed5e6`)
- **Public URL:** `https://pub-d6c6294d12e242e7acb5f8d1eaf78e06.r2.dev`

## Setup

```sh
npx wrangler login
```

Verify you're authenticated:

```sh
npx wrangler whoami
```

## Uploading

```sh
npx wrangler r2 object put nteractio-blobs/<filename> \
  --file=<local-path> \
  --content-type=<mime-type> \
  --remote
```

The `--remote` flag is required — without it wrangler writes to a local emulator.

Example:

```sh
npx wrangler r2 object put nteractio-blobs/demo.mp4 \
  --file=./demo.mp4 \
  --content-type=video/mp4 \
  --remote
```

The file is immediately available at:

```
https://pub-d6c6294d12e242e7acb5f8d1eaf78e06.r2.dev/demo.mp4
```

## Using in the site

For video (prefer MP4/WebM over GIFs — smaller, better quality):

```html
<video src="https://pub-d6c6294d12e242e7acb5f8d1eaf78e06.r2.dev/demo.mp4" autoPlay muted loop playsInline />
```

For images:

```html
<img src="https://pub-d6c6294d12e242e7acb5f8d1eaf78e06.r2.dev/screenshot.png" alt="description" />
```

## Converting GIFs to MP4

GIFs are huge. A 20 MB GIF becomes a 1–2 MB MP4:

```sh
ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p demo.mp4
```

## Cost

R2 has zero egress fees. Storage is $0.015/GB/month with a 10 GB free tier. This site will likely never leave the free tier.

## Custom domain

The bucket doesn't have a custom domain. `nteract.io` DNS is on Vercel, and R2 custom domains require the zone to be on Cloudflare. The `r2.dev` URL works fine for now. If we ever move DNS to Cloudflare, we can attach `cou.nteract.io` (or similar) to this bucket.