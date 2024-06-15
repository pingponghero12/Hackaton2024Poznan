document.getElementById('AddToMyListButton').addEventListener('click', function() {
    console.log('Add to my list button clicked');
    const paperId = document.body.dataset.paperId;
    console.log("im here");
  
    fetch('/add-to-my-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paperId }),
      credentials: 'same-origin'
    })
    .then(response => response.text())
    .then(message => {
      console.log(message);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });