export function capitalize (str = '') {
  return typeof str !== 'string' || str.length===0
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}


export function asc (items,value) {
	return items.sort(function(a,b){
		return a[value] - b[value]
	})
}

export function des (items,value) {
	return items.sort(function(a,b){
		return b[value] - a[value]
	})
}