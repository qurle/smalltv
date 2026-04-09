# SmallTV

A fast image generator for **GeekMagic Small TV Ultra** using server-side Canvas rendering.

Generates 240×240 JPEG images and uploads them to your tiny TV screen. Built with **Bun** for blazing-fast performance.

## Project Structure

```
smalltv/
├── src/
│   ├── index.ts              # Entry point - draws and uploads images
│   ├── tv-api.ts             # Typed API for Small TV Ultra
│   ├── fonts.ts              # Font registration for Canvas
│   ├── utils.ts              # Utilities (padding, background, etc.)
│   ├── config.jsonc          # TV address, location, canvas size
│   ├── theme.json            # Color theme configuration
│   ├── faces/
│   │   └── alpha/
│   │       └── index.ts      # Alpha face: time + weather display
│   └── data/
│       ├── getWeather.ts     # Weather data from weatherapi.com
│       └── getTime.ts        # Time utilities
├── scripts/
│   └── build.ts              # HTML bundler for preview
├── fonts/                    # Custom fonts (Inter Tight, Inter)
├── dist/                     # Output directory for generated images
└── index.html                # Preview page for generated images
```

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure

Copy `.env.example` to `.env` and add your WeatherAPI key:

```bash
cp .env .env
```

```env
WEATHER_API_KEY=your_weatherapi_key
```

Get a free key at [weatherapi.com](https://www.weatherapi.com).

### 3. Configure TV settings

Edit `src/config.jsonc`:

```jsonc
{
  "tv_address": "http://192.168.x.x",  // Your TV's IP address
  "location": "59.9358,30.3259",        // Your location (coordinates, city, zipcode)
  "height": "240",
  "width": "240"
}
```

Find your TV's IP address on the device or your router.

## Usage

### Run dev mode (hot reload)

```bash
bun run dev
```

### Build and generate image

```bash
bun run build
```

### Preview in browser

```bash
bun run html
```

Then open `index.html` in your browser.

## API

The project includes a fully typed API for the Small TV Ultra at `src/tv-api.ts`:

```typescript
import { setImage, setTheme, setBrightness, uploadImage } from './tv-api'

// Upload and display an image
await uploadImage('./dist/image.jpeg')
await setImage('image.jpeg')

// Change theme
await setTheme('timeWeather')

// Set brightness
await setBrightness(128)
```

### Key API functions

| Category | Functions |
|----------|-----------|
| **Images** | `uploadImage()`, `setImage()`, `deleteImage()` |
| **Themes** | `setTheme()`, `enableThemesAutoplay()` |
| **Weather** | `setLocation()`, `setWeatherUnits()`, `setUpdateInterval()` |
| **Clock** | `setTimeFormat()`, `setDateFormat()`, `setClockColors()` |
| **Display** | `setBrightness()`, `enableNightMode()`, `rotate()` |
| **WiFi** | `connectToWiFi()`, `setNTP()`, `setTimeZone()` |
| **System** | `reboot()`, `resetSettings()` |

## Adding New Faces

Create a new face in `src/faces/`:

```typescript
// src/faces/my-face/index.ts
import type { Canvas, CanvasRenderingContext2D } from 'canvas'
import theme from '@/theme.json'

export async function drawMyFace(canvas: Canvas, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = theme.colors.main
  ctx.font = '48px Inter'
  ctx.fillText('Hello!', 10, 100)
}
```

Then update `src/index.ts`:

```typescript
import { drawMyFace } from "@/faces/my-face"

const faceToDraw = 'my-face'

// In switch case:
case 'my-face': await drawMyFace(canvas, ctx)
```

## Technology

- **Bun** - Fast all-in-one JavaScript runtime
- **canvas** - Server-side 2D rendering (240×240)
- **weatherapi.com** - Weather data source
- **TypeScript** - Full type safety
