console.log('Script started'); // This will log when the script starts running

const buttonCreate = document.getElementById('create');
const label = document.getElementById('MyLabel');

console.log('Button:', buttonCreate); // This will log the button element
console.log('Label:', label); // This will log the label element

buttonCreate.onclick = function() {
  console.log('Button clicked'); // This will log when the button is clicked

  fetch('/firstItem')
    .then(response => {
      console.log('Response:', response); // This will log the response from the server
      return response.json();
    })
    .then(data => {
      console.log('Data:', data); // This will log the data from the server
      label.textContent = data.name;
    })
    .catch(error => {
      console.log('Error:', error); // This will log any errors that occur during the fetch request
    });
};