$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // list amenities
  const listAmenityId = [];
  const listAmenityName = [];
  $('.amenities input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      listAmenityId.push($(this).attr('data-id'));
      listAmenityName.push($(this).attr('data-name'));
    } else {
      listAmenityId.splice(listAmenityId.indexOf($(this).attr('data-id')), 1);
      listAmenityName.splice(
        listAmenityName.indexOf($(this).attr('data-name')),
        1
      );
    }
    console.log(listAmenityName);
    $('.amenities h4').text(listAmenityName.join(', '));
  });

  // list states
  const listStateId = [];
  const listStateName = [];
  $('.input-state').click(function () {
    if ($(this).is(':checked')) {
      listStateId.push($(this).attr('data-id'));
      listStateName.push($(this).attr('data-name'));
    } else {
      listStateId.splice(listStateId.indexOf($(this).attr('data-id')), 1);
      listStateName.splice(
        listStateName.indexOf($(this).attr('data-name')),
        1
      );
    }
    console.log(listStateName);
    $('.locations h4').text(listStateName.join(', '));
  });

  // list cities
  const listCityId = [];
  const listCityName = [];
  $('.input-city').click(function () {
    if ($(this).is(':checked')) {
      listCityId.push($(this).attr('data-id'));
      listCityName.push($(this).attr('data-name'));
    } else {
      listCityId.splice(listCityId.indexOf($(this).attr('data-id')), 1);
      listCityName.splice(
        listCityName.indexOf($(this).attr('data-name')),
        1
      );
    }
    console.log(listCityName);
    $('.locations h4').text(listCityName.join(', '));
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
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
  $('.filters button').click(function () {
    $('section.places article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      headers: {
        'content-Type': 'application/json'
      },
      data: JSON.stringify({ amenities: listAmenityId, states: listStateId, cities: listCityId }),
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
});
