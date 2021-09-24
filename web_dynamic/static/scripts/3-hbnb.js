$(function () {
  $.get('http://172.19.45.128:5001/api/v1/status/', function (data) {
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
      listAmenityName.splice(
        listAmenityName.indexOf($(this).attr('data-name')),
        1
      );
      console.log(listAmenityId);
    }
    $('.amenities h4').text(listAmenityName.join(', '));
  });
  $.ajax({
    type: 'POST',
    url: 'http://172.19.45.128:5001/api/v1/places_search/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: '{}',
    success: function (data) {
      data.forEach((element) => {
        const placeHtml = `
        <article>
            <div class="title_box">
            <h2>${element.name}</h2>
            <div class="price_by_night">${element.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${element.max_guest} Guest${element.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${element.number_rooms} Bedroom${element.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${element.number_bathrooms} Bathroom${element.max_guest !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b>Owner:</b>
          </div>
          <div class="description">${element.description}</div>
        </article>
          `;
        $('section.places').append(placeHtml);
      });
    }
  });
});
