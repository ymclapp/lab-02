'use strict';

console.log('Calling document.ready');

$(function() {
  console.log('Document is ready!');
});

const ajaxSettings = {
  method: 'get',
  dataType:  'json'
};
console.log('about to AJAX', ajaxSettings);
$.ajax('/data/page-1.json', ajaxSettings)
  .then(function (data) {
    console.log(data);
  });
