import { drawAlpha } from "@/faces/alpha";
import { registerFonts } from "@/fonts";
import { createCanvas } from "canvas";

const faceToDraw = 'alpha'

// Doing it once for debug purposes
registerFonts()
const canvas = createCanvas(240, 240)
const ctx = canvas.getContext('2d')

switch (faceToDraw) {
	case 'alpha':
	default: await drawAlpha(canvas, ctx)
}

const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 })
Bun.write(`${import.meta.dir}/../dist/alpha/image.jpeg`, buffer.buffer, { createPath: true })