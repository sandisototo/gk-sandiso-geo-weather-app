app.controller('MainController', ['$scope', '$http', 'coordinates', 'myCoordinates', function($scope, $http, coordinates, myCoordinates) {
	$scope.mapCenter = {
		lat: coordinates.lat,
		lng: coordinates.lng,
		zoom: 14
	}
	$scope.weatherData = null

	// Get map current location
	$scope.getCurrentLocation = () => {
		return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat}%2C${coordinates.lng}&language=en`)
			.then((res) => res.data)
			.then((data) => {
				// Check for errors
				if (data && data.status === 'OK') {
					$scope.city = data.results[0].address_components[2].long_name
					$scope.address = data.results[0].formatted_address

					// Get weather current
					const getWeather = getCurrentLocationWeather(coordinates.lat, coordinates.lng)
					getWeather.then((weatherData) => {
						if (weatherData) {
							const currentPositionPoint = {
								lat: coordinates.lat,
								lng: coordinates.lng,
								focus: true,
								message: `Your approximate location ${$scope.city} ( ${$scope.address} ). <br/> <br/><b>Weather Details:</b> ${displayWeatherDetails(weatherData)} <br/> <br/> Brought to you by Sandiso ;)`,
								icon: {
									type: 'awesomeMarker',
									icon: 'user',
									markerColor: 'blue',
									iconColor: 'white'
								}
							}
							$scope.mapMarkers = []
							$scope.mapMarkers.push(currentPositionPoint)

						} else {
							alert('ERROR:: Sadly :( No weather information was received! Please try again')
						}
					})
				} else {
					const error_message = data.error_message || 'Sadly :( Something wet wrong! Please try again'
					alert(`ERROR::${error_message}`)
					reloadPage()
				}
			}, (error) => {
				showErrorMsg(error)
				console.log('ERROR::', error)
			})
	}

	// Load current location
	$scope.getCurrentLocation()

	// Get current location weather
	const getCurrentLocationWeather = (lat, lng) => {
		 return $http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=53f9d8e4213222cf517d86dc406d67fc`)
			.then((res) => {
				if (res && res.status === 200) {
					return {
						main: res.data.main,
						weather: res.data.weather[0],
						wind: res.data.wind
					}
				} else {
					return null
				}
			})
			.catch((error) => {
				showErrorMsg(error)
				console.log('ERROR::', error.data)
			})
	}
	// Reload the page
	$scope.refresh = () => reloadPage()
}])
