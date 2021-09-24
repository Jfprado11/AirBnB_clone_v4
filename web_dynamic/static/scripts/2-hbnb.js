$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  const listAmenityId = [];
  const listAmenityName = [];
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      listAmenityId.push($(this).attr('data-id'));
      listAmenityName.push($(this).attr('data-name'));
      console.log(listAmenityId);
    } else {
      listAmenityId.splice(listAmenityId.indexOf($(this).attr('data-id')), 1);
      listAmenityName.splice(listAmenityName.indexOf($(this).attr('data-name')), 1);
      console.log(listAmenityId);
    }
    $('.amenities h4').text(listAmenityName.join(', '));
  });
});
