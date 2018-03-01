$.getJSON('https://world.openfoodfacts.org/countries.json', function(data) {
	for (var i = 0; i < data.tags.length; i++) {
		if ('linkeddata' in data.tags[i]) {
			let cc = data.tags[i].linkeddata['country_code_2:en']
			let pn = data.tags[i].products
			if (typeof cc == 'string') {
				cc = cc.toLowerCase()
			}
			countries[cc] = pn
		}
	}
	console.log(countries)
	$('#map-data').vectorMap({
		map: 'world_en',
		backgroundColor: '#64C5DA',
		color: '#ffffff',
		hoverColor: '#fec3c5',
		enableZoom: true,
		selectedColor: '#FFA9AB',
		enableZoom: false,
		showTooltip: true,
		scaleColors: ['#bfecf6', '#38484b'],
		values: countries,
		normalizeFunction: 'polynomial',
		onRegionClick: function(element, code, region) {
			cats = loadCat(code)
			$('#map-title p').text(region)
			$('.view-data').toggleClass('active')
			$('#map-title .circle-plus').removeClass('opened')
			$('#cat')
				.addClass('open active')
				.trigger('classChange')
		}
	})
})
