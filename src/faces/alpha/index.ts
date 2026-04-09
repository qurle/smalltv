import { Canvas, CanvasRenderingContext2D, createCanvas } from 'canvas'
import { getTime } from '@root/src/data/getTime'
import { getWeather } from '@root/src/data/getWeather'
import config from '@/config.jsonc'
import theme from '@/theme.json'

export async function drawAlpha(canvas: Canvas, ctx: CanvasRenderingContext2D) {
	drawTime(ctx)
	await drawWeather(ctx)
}

function drawTime(ctx: CanvasRenderingContext2D) {
	const time = getTime()
	ctx.fillStyle = theme.colors.main
	ctx.font = '200 100px "Inter Tight"'
	ctx.fillText(time.hours, 10, 120)
	ctx.fillStyle = theme.colors.accent
	ctx.fillText(time.minutes, 10, 210)
}

async function drawWeather(ctx: CanvasRenderingContext2D) {
	const weather = await getWeather()
	console.log(weather)
	const lineHeight = 26
	let nextLine = 132
	ctx.fillStyle = theme.colors.main
	ctx.font = '24px Inter'
	ctx.textAlign = 'right'
	ctx.fillText(weather.temp, config.width - 20, nextLine)
	nextLine += lineHeight
	ctx.globalAlpha = 0.35
	ctx.fillText(weather.cond, config.width - 20, nextLine)
	nextLine += lineHeight
	ctx.fillText(weather.wind, config.width - 20, nextLine)
	nextLine += lineHeight
	ctx.fillText(weather.willRain, config.width - 20, nextLine)
	nextLine += lineHeight
}