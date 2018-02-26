// $(document).on("ready",function () {
// 	getCountries();
// })
//
// class Cats(countrycode) {
//
// }
//
//
// function getCountries() {
//
// 	//1: get.JSON(countrylistOFF)
// 	//2: get.geoJSON(github)
// 	//merge
//
// 	//3: display map
// 	// -> hover : show country name
// 	// -> onClick : run Cats(countrycode)
//
// }
$.getJSON("https://world.openfoodfacts.org/countries.json", function(data) {
	var countries = []
	for (var i = 0; i < data.tags.length; i++) {
		if ("linkeddata" in data.tags[i]){
			let cc = data.tags[i].linkeddata["country_code_2:en"]
			let pn = data.tags[i].products
			let name = data.tags[i].name
			let country = [name,cc,pn]
			countries.push(country)
		}
	}
	countries.sort();
	$.getJSON("./js/JSON/countries.geo.json", function(geoJSON) {
		var world = {"type":"FeatureCollection","features":[]}
		for (var j = 0; j < geoJSON.features.length; j++) {
			for (var k = 0; k < countries.length; k++) {
			if( geoJSON.features[j].properties.name == countries[k][0]) {
					geoJSON.features[j].properties.cc = countries[k][1]
					geoJSON.features[j].properties.products = countries[k][2]
					world.features.push(geoJSON.features[j])
				}
			}
		}
		console.log(world)

		mapboxgl.accessToken = 'pk.eyJ1IjoibGVzbGllY29ybmUiLCJhIjoiY2pjb3gybDdvMWwxcjJ6bjBqODJlNDQ0MSJ9.6pQGKf3ORUxIv_d53-P3LQ';
		var map = new mapboxgl.Map({
		    container: 'map', // container id
		    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
		    center: [-0.38066164266638225, 29.90066611895608], // starting position [lng, lat]
		    zoom: 1.45 // starting zoom
		})
		map.on("load",function () {
			map.addLayer({
				'id': 'countries',
        'type': 'fill',
				'source': {
					'type': 'geojson',
          'data': world,
				},
				'layout': {},
        'paint': {
						'fill-outline-color': '#000000',
            'fill-color': [
							'interpolate',
							['linear'],
							['get','products'],
							0,'rgb(255, 255, 255)',
							10000,'rgb(19, 13, 57)'
						],
            'fill-opacity': 0.8
        }
			})
		})
	})
})
