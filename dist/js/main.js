var cats = []
var catList = []
var countries = {}

function getMax(arr, prop) {
	var max
	for (var i = 0; i < arr.length; i++) {
		if (!max || parseInt(arr[i][prop]) > parseInt(max[prop])) max = arr[i]
	}
	return max
}
