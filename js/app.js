'use strict';

console.log('Calling document.ready');

$(function() {
  console.log('Document is ready!');
});

var arr = 'data/page-1.json';
// var file = rawFile.filter((v, i, a) => a.indexOf(v) === i);


// arr = arr.sort().filter((item,i) => !(arr[i] === arr[i+1] || arr[i-1] === arr[i]));
// console.log(arr);

$('#bt').click(function () {
  $.getJSON(arr,function (data) {
    $.each(data, function (index, value) {
      $('#sel').append('<option value = " ' + value.ID + '">' + value.keyword + '</option>');
    });
  });
});



//Show selected value
$('#sel').change(function () {
  $('#msg').text('Selected Item:  ' + this.options[this.selectedIndex].text);
});

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.prototype.render = function(container) {
  let $container = $(container);
  let $template = $container.find('.horn-template');
  let $horn = $template.clone();
  $horn.removeClass('horn-template');
  $horn.find('.horn-title').text(this.title);
  $horn.find('img.horn-image').attr('src',this.image_url);
  $horn.find('.horn-description').text('Description:  ' + this.description);
  $container.append($horn);
}

// var select = document.getElementsByClassName('horn-keyword');
// var list = this.keyword;
// $('.horn-keyword').empty();
// $.each(list, function (i, p) {
//   $('.horn-keyword').append($('<option></option>').val(p).html(p))
// });


$('main section').hide();
const ajaxSettings = {
  method:  'get',
  dataType:  'json'
};




console.log('about to AJAX', ajaxSettings);
$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);
    const horn = data;
    horn.forEach(horn => {
      console.log(horn.title);
      let actualHorn = new Horn(horn);
      console.log(actualHorn);
      actualHorn.render('main section');
    })
  });
