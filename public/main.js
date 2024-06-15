console.log('Script started'); // This will log when the script starts running

const signupButton = document.getElementById('signup');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const signinButton = document.getElementById('signin');

signupButton.onclick = function() {
  const username = loginInput.value;
  const password = passwordInput.value; // Replace this with the actual password

  fetch('/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Log the response from the server
  })
  .catch(error => {
    console.error('Error:', error);
  });
};



signinButton.onclick = function() {
  const username = loginInput.value;
  const password = passwordInput.value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Log the response from the server
  })
  .catch(error => {
    console.error('Error:', error);
  });
};