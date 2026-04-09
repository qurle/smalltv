import type { Canvas, CanvasRenderingContext2D } from "canvas"
import theme from '@/theme.json'

export function pad(number: number) {
	return number.toString().padStart(2, '0')
}

export function setBackground(canvas: Canvas, ctx: CanvasRenderingContext2D, color: string = theme.colors.bg) {
	ctx.fillStyle = color
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}