var app = angular.module('geoApp', ['ngRoute', 'leaflet-directive'])

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/main.html',
		resolve: {
			coordinates: (myCoordinates) => myCoordinates
		}
	})
	.otherwise({
		redirectTo: '/'
	})
})
