const convertToCelsius = (value) =>  Math.round((value -32) * 5 / 9)
const reloadPage = () => location.reload(true)

const displayWeatherDetails = function(weatherData) {
	let hum = `<br/> Humidity: ${convertToCelsius(weatherData.main.humidity)} c`
	let pre = `<br/> Pressure: ${weatherData.main.pressure}`
	let min = `<br/> Min temperature: ${weatherData.main.temp_min}`
	let max = `<br/> Max temperature: ${weatherData.main.temp_max}`
	let des = `<br/> Sky: ${weatherData.weather.description}`
	let spe = `<br/> Wind: ${weatherData.wind.speed} km/h`

	return `${hum}${pre}${min}${max}${des}${spe}`
}

const showErrorMsg = (error) => {
	const message = error.data && error.data.message ? error.data.message : 'There was a technical error. Please try again!'
	alert(message)
}
