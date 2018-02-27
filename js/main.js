var cc = 'world'
var cats = []
$(document).ready(function() {
	loadCat(cc)
	$('#map').on('click', function() {
		cats = loadCat(cc)
	})
})
function getMax(arr, prop) {
	var max
	for (var i = 0; i < arr.length; i++) {
		if (!max || parseInt(arr[i][prop]) > parseInt(max[prop])) max = arr[i]
	}
	return max
}
