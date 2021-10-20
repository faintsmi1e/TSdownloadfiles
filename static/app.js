const pond = FilePond.create({
  multiple: true,
  name: 'filepond',
  server: '/upload'
});

// Add it to the DOM
document.body.appendChild(pond.element);