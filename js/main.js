var $photoUrl = document.querySelector('#photoUrl');
var $placeholder = document.querySelector('.placeholder');
var $entryForm = document.querySelector('#entry-form');
var $formId = document.querySelector('#form-id');

$photoUrl.addEventListener('input', function (event) {
  $placeholder.style.setProperty('background-image', 'url(' + event.target.value + ')');
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputValues = {};
  inputValues.title = $formId.title.value;
  inputValues.photoUrl = $formId.photoUrl.value;
  inputValues.notes = $formId.notes.value;
  inputValues.nextEntryId = data.nextEntryId++;
  $placeholder.style.setProperty('background-image', 'url(/images/placeholder-image-square.jpg)');
  $formId.reset();
  data.entries.unshift(inputValues);
});
