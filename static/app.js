const pond = FilePond.create({
  multiple: true,
  name: 'filepond',
  server: '/upload'
});
const aDiv = document.createElement('div');
pond.on('processfile', (e, file) => {
  aDiv.textContent = '';
  const json = file.serverId;
  const data = JSON.parse(json)

  const id = data.id
  const link = document.createElement('a');
  link.href = window.location + 'd/' + id
  link.textContent = link.href;
  aDiv.appendChild(link);
})
// Add it to the DOM
document.body.appendChild(pond.element);
document.body.appendChild(aDiv);