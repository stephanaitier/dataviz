function loadCatStat(cat) {
	var category = catList[cat]
	var pages = Math.floor(category.product / 20)
	let prodSize = category.product
	var prog = 0
	var nutriments = []
	var deferreds = []
	var htmlContent = '<div id="cat-loader"><div id="percent"></div></div>'
	$('body').append(htmlContent)
	for (var i = 1; i < pages + 1; i++) {
		deferreds.push(
			$.getJSON(`${category.url}/${i}.json`, function(data) {
				for (var j = 0; j < data.products.length; j++) {
					let nut = data.products[j].nutriments
					let size = Object.size(nut)
					if (size > 0) {
						nutriments.push(nut)
						let progess = Math.floor(prog / prodSize * 100)
						let text = `${progess}%`
						$('#percent').text(text)
						prog++
					}
				}
			})
		)
	}
	$.when
		.apply($, deferreds)
		.then(function() {
			$('#cat-loader').remove()
			console.log(nutriments)
		})
		.fail(function() {
			console.error("can't load nutriments")
		})
}
Object.size = function(obj) {
	var size = 0,
		key
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++
	}
	return size
}
