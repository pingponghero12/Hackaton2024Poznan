const buttonCreate = document.getElementById('create');
const label = document.getElementById('label'); // Assuming you have a label element with id 'label'

buttonCreate.onclick = function() {
  fetch('/create', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      label.textContent = data.name; // Update the label with the name of the newly created item
    });
};