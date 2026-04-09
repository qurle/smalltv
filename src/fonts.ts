import { registerFont } from 'canvas'

export function registerFonts() {
	registerFont(`${import.meta.dir}/../fonts/InterTight-ExtraLight.ttf`, {
		family: 'InterTight',
		weight: 'normal'
	})
	registerFont(`${import.meta.dir}/../fonts/Inter-Regular.otf`, {
		family: 'Inter',
		weight: '400'
	})
}