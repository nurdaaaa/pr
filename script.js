function searchBooks() {
    const input = document.getElementById('bookInput').value;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then(response => response.json())
      .then(data => {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        data.items.forEach(item => {
          const bookTitle = item.volumeInfo.title;
          const bookAuthor = item.volumeInfo.authors[0];
          const buyButton = `<button onclick="showForm('${bookTitle}', '${bookAuthor}')">Купить</button>`;
          bookList.innerHTML += `<p>${bookTitle} - ${bookAuthor} ${buyButton}</p>`;
        });
      })
      .catch(error => console.error('Error:', error));
  }
function showForm(title, author) {
    const form = `
      <form id="buyForm">
        <label for="name">Имя:</label>
        <input type="text" id="name" required><br>
        <label for="email">Почта:</label>
        <input type="email" id="email" required><br>
        <label for="phone">Телефон:</label>
        <input type="tel" id="phone" required><br>
        <label for="address">Адрес:</label>
        <input type="text" id="address" required><br>
        <button type="submit">Отправить</button>
      </form>
    `;
    document.getElementById('bookList').insertAdjacentHTML('beforeend', form);
    
    document.getElementById('buyForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      
      // Отправка данных на сервер или Google Sheets
      sendDataToGoogleSheets(title, author, name, email, phone, address);
    });
  }
  
  function sendDataToGoogleSheets(title, author, name, email, phone, address) {
    const bookInfo = ['Название книги', 'Автор'];
writeToSheet(bookInfo);
  }
  
