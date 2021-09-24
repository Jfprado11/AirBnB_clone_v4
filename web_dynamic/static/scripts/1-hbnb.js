$(function() {
	let list_amenity_id = []
    $('input:checkbox').click(function () {
		if($(this).is(':checked')) {
			list_amenity_id.push($(this).attr('data-id'))
			console.log(list_amenity_id)
		}
		else {
			list_amenity_id.splice(list_amenity_id.indexOf($(this).attr('data-id')), 1)
			console.log(list_amenity_id)
		}
	})
});