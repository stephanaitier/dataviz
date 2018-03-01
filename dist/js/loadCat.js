function loadCat(cc) {
	$.getJSON(`https://${cc}.openfoodfacts.org/categories.json`, function(data) {
		catList = []
		var maxproduct = getMax(data.tags, 'products').products
		for (cat of data.tags) {
			var reg = /([^:]*)$/g
			var id = cat.id.match(reg)
			if (
				(maxproduct > 5000 && cat.products > 1000 && id) ||
				(maxproduct < 5000 &&
					(cat.products > maxproduct / 10 || cat.products > 0) &&
					id)
			) {
				let name = id[0]
				name = name.charAt(0).toUpperCase() + name.slice(1)
				name = name.replace(/-/g, ' ')
				let datas = {
					url: cat.url,
					product: cat.products,
					name: name
				}
				catList.push(datas)
			}
		}
		$('#cat ul')
			.children()
			.remove()
		for (var i = 0; i < catList.length; i++) {
			let content = `<li id="${i}">${catList[i].name}</li>`
			$('#cat ul').append(content)
		}
		$('#cat li').click(function() {
			var id = $(this).attr('id')
			loadCatStat(id)
		})
	})
}
