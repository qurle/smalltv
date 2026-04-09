import { pad } from "@/utils"

export function getTime() {
	const now = new Date()
	return {
		hours: pad(now.getHours()),
		minutes: pad(now.getMinutes())
	}
}