const pond = FilePond.create({
  multiple: true,
  name: 'filepond'
});

// Add it to the DOM
document.body.appendChild(pond.element);