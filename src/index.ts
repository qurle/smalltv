import { drawAlpha } from "@/faces/alpha";
import { registerFonts } from "@/fonts";
import { createCanvas } from "canvas";
import { setImage, uploadImage } from "./tv-api";

const faceToDraw = 'alpha'

// Doing it once for debug purposes
registerFonts()
const canvas = createCanvas(240, 240)
const ctx = canvas.getContext('2d')

switch (faceToDraw) {
	case 'alpha':
	default: await drawAlpha(canvas, ctx)
}

const dist = `${import.meta.dir}/../dist/`
const name = `image-alpha.jpeg`
const path = dist + name

const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 })
Bun.write(path, buffer.buffer, { createPath: true })

await uploadImage(path)
await setImage(name)