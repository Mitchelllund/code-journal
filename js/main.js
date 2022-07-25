var $photoUrl = document.querySelector('#photoUrl');
var $placeholder = document.querySelector('.placeholder');
var $entryForm = document.querySelector('#entry-form');
var $formId = document.querySelector('#form-id');
var $entriesPage = document.querySelector('#entries-page');
var $new = document.querySelector('#new');
var $entriesButton = document.querySelector('#entries-button');
var $entries = document.querySelector('#entries');
var $li = $entries.childNodes;

$photoUrl.addEventListener('input', function (event) {
  $placeholder.style.setProperty('background-image', 'url(' + event.target.value + ')');
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    var inputValues = {};
    inputValues.title = $formId.title.value;
    inputValues.photoUrl = $formId.photoUrl.value;
    inputValues.notes = $formId.notes.value;
    inputValues.nextEntryId = data.nextEntryId++;
    $placeholder.style.setProperty('background-image', 'url(/images/placeholder-image-square.jpg)');
    $formId.reset();
    data.entries.unshift(inputValues);
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    $entries.prepend(renderEntry(inputValues));
  } else if (data.editing !== null) {
    var updatedValue = {};
    updatedValue.title = $formId.title.value;
    updatedValue.photoUrl = $formId.photoUrl.value;
    updatedValue.notes = $formId.notes.value;
    updatedValue.nextEntryId = data.editing.nextEntryId;
    data.entries.splice(data.entries.length - data.editing.nextEntryId, 1, updatedValue);
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    var entryLocation = $li.item(data.entries.length - data.editing.nextEntryId);
    entryLocation.replaceWith(renderEntry(updatedValue));
    data.editing = null;
  }
});

var targetEntry = 0;
function renderEntry(entry) {
  var list = document.createElement('li');
  list.setAttribute('data-entry-id', targetEntry++);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  list.appendChild(row);

  var columnHalfDiv = document.createElement('div');
  columnHalfDiv.setAttribute('class', 'column-half margin-bottom-30');
  row.appendChild(columnHalfDiv);

  var imgDiv = document.createElement('img');
  imgDiv.setAttribute('src', entry.photoUrl);
  columnHalfDiv.appendChild(imgDiv);

  var columnHalfDiv2 = document.createElement('div');
  columnHalfDiv2.setAttribute('class', 'column-half');
  row.appendChild(columnHalfDiv2);

  var columnHalfDiv3 = document.createElement('div');
  columnHalfDiv3.setAttribute('class', 'column-fourth justify-space-between');
  columnHalfDiv2.appendChild(columnHalfDiv3);
  var header = document.createElement('h3');
  header.setAttribute('class', 'margin-0');
  var headerTitle = document.createTextNode(entry.title);
  header.appendChild(headerTitle);
  columnHalfDiv3.appendChild(header);
  var edit = document.createElement('i');
  edit.setAttribute('class', 'fa-solid fa-pen align-self-center');
  edit.setAttribute('id', 'edit');
  columnHalfDiv3.appendChild(edit);

  var paragraph = document.createElement('p');
  var notes = document.createTextNode(entry.notes);
  paragraph.appendChild(notes);
  columnHalfDiv2.appendChild(paragraph);

  return list;
}

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var $entry = renderEntry(data.entries[i]);
    $entries.appendChild($entry);
  }
  pageRefresh();
});

function viewSwap(event) {
  if (event.target.getAttribute('id') === $entriesButton.getAttribute('id')) {
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.view = $entriesPage.getAttribute('data-view');
  } else if (event.target.getAttribute('id') === $new.getAttribute('id')) {
    $entriesPage.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = $entryForm.getAttribute('data-view');
  }
}

$entriesButton.addEventListener('click', viewSwap);
$new.addEventListener('click', viewSwap);

function pageRefresh(string) {
  if (data.view === 'entries') {
    $entryForm.classList.add('hidden');
    $entriesPage.classList.remove('hidden');
  } else if (data.view === 'entry-form') {
    $entryForm.classList.remove('hidden');
    $entriesPage.classList.add('hidden');
  }
}

$entries.addEventListener('click', function (event) {
  if (event.target.getAttribute('id') === 'edit') {
    $entriesPage.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    var targetEntry = event.target.closest('li').getAttribute('data-entry-id');
    data.editing = data.entries[targetEntry];
    $formId.title.value = data.editing.title;
    $formId.photoUrl.value = data.editing.photoUrl;
    $formId.notes.value = data.editing.notes;
    $placeholder.style.setProperty('background-image', 'url(' + data.editing.photoUrl + ')');
  }
});
