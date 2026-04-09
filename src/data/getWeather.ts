import config from '@/config.jsonc'

const url = 'https://api.weatherapi.com/v1/forecast.json'


export async function getWeather(metric = true) {
	const data = await extractWeatherData()
	const conditionMaxLength = 6

	let cond = data.cond.trim().toLowerCase()
	if (cond.length > conditionMaxLength - 1)
		cond = cond.slice(0, conditionMaxLength).trim() + '.'

	return {
		temp: metric ? Math.round(data.temp.m) + ' °C' : Math.round(data.temp.i) + ' °F',
		wind: metric ? (data.wind.m / 3.6).toFixed(1) + ' m/s' : data.wind.i.toFixed(1) + ' mph',
		cond: cond,
		willRain: Boolean(data.willRain) ? 'will rain' : 'no rain'
	}
}

async function extractWeatherData() {
	const response = await fetch([
		url,
		`?key=${process.env.WEATHER_API_KEY}`,
		`&q=${config.location}`
	].join(''))

	const json = await response.json() as any



	// Look for the next hour
	const now = new Date().getUTCSeconds()
	const forecast = json.forecast.forecastday[0].hour
		.find((hour: any) => hour.time_epoch > now)

	return {
		temp: {
			m: forecast.temp_c as number,
			i: forecast.temp_f as number
		},
		wind: {
			m: forecast.wind_kph as number,
			i: forecast.wind_mph as number,
		},
		cond: forecast.condition.text as string,
		willRain: forecast.will_it_rain as number
	}
}