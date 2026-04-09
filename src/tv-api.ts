import config from '@/config.jsonc'

const themes = {
	'detailed': 1,
	'forecast': 2,
	'media': 3,
	'diagonalTime': 4,
	'timeDate': 5,
	'time': 6,
	'timeWeather': 7
}

type Theme = keyof typeof themes

const fonts = {
	'default': 1,
	'digital': 2
}

type Font = keyof typeof fonts

const timeFormats = {
	'24h': 0,
	'12h': 1
}

type TimeFormat = keyof typeof timeFormats

const dateFormats = {
	'DD/MM/YYYY': 1,
	'YYYY/MM/DD': 2,
	'MM/DD/YYYY': 3,
	'MM/DD': 4,
	'DD/MM': 5,

}

type DateFormat = keyof typeof dateFormats

type WindSpeedUnit = 'm/s' | 'km/h' | 'mile/h'

type TemperatureUnit = 'C' | 'F'

type PressureUnit = 'hPa' | 'kPa' | 'mmHg' | 'inHg'


// Shoutout to github.com/joeyparis who did the list of all used enpoints
// https://github.com/GeekMagicClock/HelloCubic-Lite/issues/19

// ===== Wi-Fi =====

export async function connectToWiFi(name: string, password: string) {
	return await getWithStatus(`wifisave?s=${name}&p=${password}`)
}

export async function setConnectionDelay(delay = 10) {
	return await getWithStatus(`wifisave?delay=${delay}`)
}

// ===== Weather =====

export async function setLocation(location: number | string = 536203) {
	return await getWithStatus(`set?cd1=${location}&cd2=1000`)
}

export async function setWeatherUnits(windUnit: WindSpeedUnit | '', temperatureUnit: TemperatureUnit | '', pressureUnit: PressureUnit | '') {
	return await getWithStatus(`set?w_u=${windUnit}&t_u=%C2%B0${temperatureUnit}&p_u=${pressureUnit}`)
}

export async function setWindUnit(windUnit: WindSpeedUnit) {
	return await setWeatherUnits(windUnit, '', '')
}

export async function setTemperatureUnit(temperatureUnit: TemperatureUnit) {
	return await setWeatherUnits('', temperatureUnit, '')
}

export async function setPressureUnit(pressureUnit: PressureUnit) {
	return await setWeatherUnits('', '', pressureUnit)
}

export async function setUpdateInterval(intervalInMinutes = 20) {
	return await getWithStatus(`set?w_i=${intervalInMinutes}`)
}

export async function setOpenWeatherAPIKey(key: string) {
	return await getWithStatus(`set?key=${key}`)
}

// ===== Visuals =====

export async function rotate(angle: 0 | 1 | 2 | 3 | 4 = 4) {
	return await getWithStatus(`set?rot=${angle}`)
}

export async function setTheme(theme: Theme) {
	return await getWithStatus(`set?i_i=${themes[theme]}`)
}

export async function enableThemesAutoplay(themeList: Theme[] = Object.keys(themes) as Theme[], intervalInSeconds = 10) {
	const themesBoolean = Object.keys(themes).map((k: Theme) => { if (themeList.includes(k)) return 1; return 0 })
	return await getWithStatus(`set?theme_list=${themesBoolean.join()}&sw_en=1&theme_interval=${intervalInSeconds}`)
}

export async function disableThemesAutoplay() {
	return await getWithStatus(`set?theme_list=0&sw_en=0&theme_interval=10`)
}

export async function setClockColors(hexHours = '#FAFAFA', hexMinutes = '#DDFF00', hexSeconds = '#757575') {
	return await getWithStatus(`set?hc=%23${hexHours.replace('#', '')}&mc=%23${hexMinutes.replace('#', '')}&sc=%23${hexSeconds.replace('#', '')}`)
}

export async function enableBlink() {
	return await getWithStatus(`set?colon=1`)
}

export async function disableBlink() {
	return await getWithStatus(`set?colon=0`)
}

export async function setFont(font: Font) {
	return await getWithStatus(`set?font=${fonts[font]}`)
}

// ===== Images =====

export async function enableImagesAutoplay(intervalInSeconds = 5) {
	return await getWithStatus(`set?i_i=${intervalInSeconds}&autoplay=1`)
}

export async function disableImagesAutoplay() {
	return await getWithStatus(`set?i_i=&autoplay=0`)
}

export async function setImage(name: string) {
	return await getWithStatus(`set?img=%2Fimage%2F${name}`)
}

export async function setClockGif(name: string) {
	return await getWithStatus(`set?gif=%2Fgif%2F${name}`)
}

export async function deleteImage(name: string) {
	return await getWithStatus(`delete?img=%2Fimage%2F${name}`)
}

export async function deleteAllImages(name: string) {
	return await getWithStatus(`delete?img=%2Fimage%2F${name}`)
}

export async function uploadImage(filepath: string) {
	return postFormFile(`doUpload?dir=/image/`, filepath)
}

export async function uploadClockGif(filepath: string) {
	return postFormFile(`doUpload?dir=/gif/`, filepath)
}

// ===== Brightness =====

export async function setBrightness(brightness = 160) {
	return await getWithStatus(`set?brt=${brightness}`)
}

export async function enableNightMode(fromHour = 22, toHour = 6, nightBrigtness = 64) {
	return await getWithStatus(`set?t1=${fromHour}&t2=${toHour}&b1=50&b2=${nightBrigtness}&en=1`)
}

export async function disableNightMode() {
	return await getWithStatus(`set?t1=22&t2=6&b1=50&b2=644&en=0`)
}

// ===== Format =====

export async function setTimeFormat(timeFormat: TimeFormat) {
	return await getWithStatus(`set?hour=${timeFormats[timeFormat]}`)
}

export async function setDateFormat(dateFormat: DateFormat) {
	return await getWithStatus(`set?day=${dateFormats[dateFormat]}`)
}

// ===== Time =====

export async function setNTP(domain = 'pool.ntp.org') {
	return await getWithStatus(`set?ntp=${domain}`)
}

export async function enableDaylightSavings() {
	return await getWithStatus(`set?dst=1`)
}

export async function disableDaylightSavings() {
	return await getWithStatus(`set?dst=0`)
}

export async function setTimeZone(offset: number | 'auto' = 'auto') {
	let path = `set?tz_auto=1&tz_offset=180`
	if (offset !== 'auto')
		path = `set?tz_auto=0&tz_offset=${path}`
	return await getWithStatus(path)
}


// ===== System =====

export async function reboot() {
	return await getWithStatus(`set?reboot=1`)
}

export async function resetSettings() {
	return getWithStatus(`set?reset=1`)
}


// ===== Data =====


export async function checkWiFiNetworks() {
	return getWithJSON(`wifi.json`)
}

export async function checkStorage() {
	return getWithJSON(`space.json`)
}

export async function checkAutoplay() {
	return getWithJSON(`album.json`)
}

export async function checkCurrentTheme() {
	return getWithJSON(`app.json`)
}

export async function checkBrightness() {
	return getWithJSON(`brt.json`)
}

export async function checkBlink() {
	return getWithJSON(`colon.json`)
}

export async function checkCurrentWiFi() {
	return getWithJSON(`config.json`)
}

export async function checkCountdownDay() {
	return getWithJSON(`day.json`)
}

export async function checkConnectionDelay() {
	return getWithJSON(`delay.json`)
}

export async function checkCurrentFont() {
	return getWithJSON(`font.json`)
}

export async function checkOpenWeatherKey() {
	return getWithJSON(`key.json`)
}

export async function checkNTPServer() {
	return getWithJSON(`ntp.json`)
}

export async function checkThemes() {
	return getWithJSON(`theme_list.json`)
}

export async function checkNightmode() {
	return getWithJSON(`timebrt.json`)
}

export async function checkTimeColors() {
	return getWithJSON(`timecolor.json`)
}

export async function checkUnits() {
	return getWithJSON(`unit.json`)
}

export async function checkVersion() {
	return getWithJSON(`v.json`)
}

// These ones do not seem to work in Small TV Ultra:

async function countdown(date: Date) {
	return await getWithStatus(`set?yr=${date.getFullYear()}&mth=${date.getMonth()}&day=${date.getDate()}`)
}


// There are multiple endpoint types: some return simple statuses, some gives JSON data and some should have body

async function getWithStatus(endpoint: string) {
	return await (await fetch(config.tv_address + '/' + endpoint)).text()
}

async function getWithJSON(endpoint: string) {
	return await (await fetch(config.tv_address + '/' + endpoint)).json()
}


async function postFormFile(endpoint: string, filepath: string) {
	const formData = new FormData()
	if (filepath.endsWith('.gif')) {
		formData.append("update", Bun.file(filepath))
		formData.append("image", Bun.file(filepath))
	} else {
		formData.append("file", Bun.file(filepath), filepath.split('/').pop())
	}

	// Debug: Log all keys and values
	console.log(Array.from(formData.entries()));

	// Debug: Specific check for the file object
	const fileEntry = formData.get("file");
	if (fileEntry instanceof Blob) {
		console.log(`File Name: ${fileEntry.name}`);
		console.log(`File Size: ${fileEntry.size} bytes`);
		console.log(`MIME Type: ${fileEntry.type}`);
	}

	console.log('path: ' + config.tv_address + '/' + endpoint)
	return await fetch(config.tv_address + '/' + endpoint, {
		method: "POST",
		body: formData,
	})
}

async function status(promise: Promise<Response>) {
	return await (await promise).text()
}