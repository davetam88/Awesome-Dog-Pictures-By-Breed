'use strict';

function getDogImage(breedType) {
  fetch(`https://dog.ceo/api/breed/${breedType}/images/random`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson, breedType))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];

  for (var x = 0; x < array1.length; x++)
  {
    newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
  }
  return newarray1.join(' ');
}



function displayResults(responseJson, breedType) {
  // check for 404 
  if (responseJson.code === 404)
  {
    $('.results').removeClass('hidden');
    $('.status-msg').removeClass("status-ok");
    $('.status-msg').addClass("status-bad");
    $('.status-msg').text(responseJson.message);
    $('.results-img').addClass('hidden');
    return;
  }

  breedType = uppercase(breedType);
  const enjoyPic = `Heres' Your Awesome '${breedType}' Picture, Enjoy !`;
  $('.status-msg').text(enjoyPic);
  $('.status-msg').removeClass("status-bad");
  $('.status-msg').addClass("status-ok");
  $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
  )
  //display the results section
  $('.results-img').removeClass('hidden');
  $('.results').removeClass('hidden');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userTextElement = $(event.currentTarget).find('#breed-type');
    var breedType = userTextElement.val();
    // make into lower case, otherwise fetch will flag an error.
    var breedType = breedType.toLowerCase(); // dbg.
    userTextElement.val("");
    getDogImage(breedType);
  });
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
