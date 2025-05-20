// Quote API
fetch('https://api.quotable.io/random')
  .then(res => res.json())
  .then(data => {
    document.getElementById('quote').textContent = `"${data.content}" — ${data.author}`;
  })
  .catch(() => {
    document.getElementById('quote').textContent = "Failed to load quote.";
  });

// Load JSON data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const achList = document.getElementById('achievements-list');
    const booksList = document.getElementById('books-list');
    const hobbiesList = document.getElementById('hobbies-list');

    data.achievements.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.title} (${item.year})`;
      achList.appendChild(li);
    });

    data.books.forEach(book => {
      const li = document.createElement('li');
      li.textContent = book;
      booksList.appendChild(li);
    });

    data.hobbies.forEach(hobby => {
      const li = document.createElement('li');
      li.textContent = hobby;
      hobbiesList.appendChild(li);
    });
  })
  .catch(error => console.error("Failed to load JSON data", error));
