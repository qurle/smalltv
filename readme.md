# SmallTV

Image generator for GeekMagic Small TV Ultra. Renders 240×240 images via server-side Canvas and uploads to device. Built with Bun.


![Frame 4](https://github.com/user-attachments/assets/ce26da82-2976-40e4-abce-6607cca6fafb)


## Setup

```bash
bun install
```

Grab free key at [Weather API](https://www.weatherapi.com) and add to `.env` file in project root.
```env
WEATHER_API_KEY = gpor4355oi940m3fdog
```

Configure `src/config.jsonc`:
```jsonc
{
  "tv_address": "http://192.168.x.x",  // TV IP
  "location": "59.9358,30.3259",        // Lat,Lon
  "height": "240",
  "width": "240"
}
```

## Usage

```bash
bun run dev    # dev mode with hot reload
bun run build  # generate image and upload
bun run html   # preview HTML
```

## API

Typed API in `src/tv-api.ts`:

```typescript
import { setImage, uploadImage } from './tv-api'

await uploadImage('./dist/image.jpeg')
await setImage('image.jpeg')
```

### Functions

| Category | Functions |
|----------|-----------|
| **Images** | `uploadImage()`, `setImage()`, `deleteImage()` |
| **Themes** | `setTheme()`, `enableThemesAutoplay()` |
| **Weather** | `setLocation()`, `setWeatherUnits()` |
| **Clock** | `setTimeFormat()`, `setDateFormat()`, `setClockColors()` |
| **Display** | `setBrightness()`, `enableNightMode()`, `rotate()` |
| **System** | `reboot()`, `resetSettings()` |

## New Face

Create `src/faces/my-face/index.ts`:
```typescript
import type { Canvas, CanvasRenderingContext2D } from 'canvas'
import theme from '@/theme.json'

export async function drawMyFace(canvas: Canvas, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = theme.colors.main
  ctx.font = '48px Inter'
  ctx.fillText('Hello!', 10, 100)
}
```

Add to `src/index.ts`:
```typescript
import { drawMyFace } from "@/faces/my-face"

const faceToDraw = 'my-face'
// case 'my-face': await drawMyFace(canvas, ctx)
```

## Structure

```
src/
├── index.ts           # entry point
├── tv-api.ts          # typed TV API
├── fonts.ts           # font registration
├── utils.ts           # helpers
├── config.jsonc       # TV address, location
├── theme.json         # colors
├── faces/             # face renderers
│   └── alpha/         # time + weather
├── data/              # weather, time fetchers
scripts/build.ts      # HTML bundler
fonts/                 # custom fonts
dist/                  # output
```

## Roadmap

- [ ] Preview and switch between multiple faces
- [ ] Automation (send image every minute)
- [ ] More faces with cool designs

## Stack

Bun · Canvas · Weather · TypeScript

Special thanks to [@joeyparis](https://github.com/joeyparis), who figured out a lot of API for GeekMagic stuff.
And also to [@GeekMagic](https://github.com/GeekMagicClock) for making this cute piece of hackable joy.
