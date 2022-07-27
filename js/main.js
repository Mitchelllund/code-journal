var $photoUrl = document.querySelector('#photoUrl');
var $placeholder = document.querySelector('.placeholder');
var $entryForm = document.querySelector('#entry-form');
var $formId = document.querySelector('#form-id');
var $entriesPage = document.querySelector('#entries-page');
var $entriesButton = document.querySelector('#entries-button');
var $entries = document.querySelector('#entries');
var $new = document.getElementById('new');

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
    inputValues.entryId = data.nextEntryId++;
    $placeholder.style.setProperty('background-image', 'url(/images/placeholder-image-square.jpg)');
    $formId.reset();
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.entries.unshift(inputValues);
    $entries.prepend(renderEntry(inputValues));
  }
  if (data.editing !== null) {
    var entryObject = {};
    entryObject.entryId = data.editing.getAttribute('data-entry-id');
    entryObject.title = $formId.title.value;
    entryObject.photoUrl = $formId.photoUrl.value;
    entryObject.notes = $formId.notes.value;
    var targetEntry = data.editing;
    targetEntry.replaceWith(renderEntry(entryObject));
    data.entries[data.entries.length - entryObject.entryId] = entryObject;
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  }
});

function renderEntry(entry) {
  var list = document.createElement('li');
  list.setAttribute('data-entry-id', entry.entryId);

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
  if (event.target.getAttribute('id') === 'entries-button') {
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
    data.view = $entriesPage.getAttribute('data-view');
  } else if (event.target.getAttribute('id') === 'new') {
    $entriesPage.classList.add('hidden');
    $entryForm.classList.remove('hidden');
    data.view = $entryForm.getAttribute('data-view');
  }
}

$entriesButton.addEventListener('click', viewSwap);
$entryForm.addEventListener('click', viewSwap);
$new.addEventListener('click', viewSwap);

function pageRefresh(string) {
  data.editing = null;
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
    var targetEntry = event.target.closest('li');
    data.editing = targetEntry;
    var entryObject = getEntry(targetEntry);
    $formId.title.value = entryObject.title;
    $formId.photoUrl.value = entryObject.photoUrl;
    $formId.notes.value = entryObject.notes;
    $placeholder.style.setProperty('background-image', 'url(' + entryObject.photoUrl + ')');
    $entriesPage.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
});

function getEntry(targetEntry) {
  var entryId = targetEntry.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId.toString()) {
      var entryObject = data.entries[i];
      return entryObject;

    }
  }
}
