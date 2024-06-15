console.log('Script started'); // This will log when the script starts running

const Title = document.getElementById('title');
const PublicationDate = document.getElementById('publicationDate');
const Author = document.getElementById('author');
const Description = document.getElementById('description');

const AddPaperButton = document.getElementById('addPaperButton');

window.onload = function() {
  fetch('/papers')
    .then(response => response.json())
    .then(papers => {
      const papersDiv = document.getElementById('papers');

      papers.forEach(paper => {
        const paperDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.textContent = paper.title;
        paperDiv.appendChild(title);

        const publicationDate = document.createElement('p');
        publicationDate.textContent = paper.publicationDate;
        paperDiv.appendChild(publicationDate);

        const author = document.createElement('p');
        author.textContent = paper.author;
        paperDiv.appendChild(author);

        const description = document.createElement('p');
        description.textContent = paper.description;
        paperDiv.appendChild(description);

        papersDiv.appendChild(paperDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

AddPaperButton.onclick = function() {
    const title = Title.value;
    const publicationDate = new Date(PublicationDate.value);
    const author = Author.value;
    const description = Description.value;
    const formattedDate = publicationDate.toISOString().split('T')[0];

    console.log(publicationDate);
    fetch('/addPaper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, formattedDate, author, description}),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Log the response from the server
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
