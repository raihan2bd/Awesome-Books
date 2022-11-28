// Book constructor will create a single book.
function Book(title, author) {
  this.id = this.generateId();
  this.title = title;
  this.author = author;
}

// This generateId function will return unique id for book
Book.prototype.generateId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Books constructor will manage books.
function ManageBooks() {
  if (localStorage.getItem('books')) {
    this.books = JSON.parse(localStorage.getItem('books'));
  } else {
    this.books = [];
  }
}

// Add book in Books constructor
ManageBooks.prototype.add = function (title, author) {
  const book = new Book(title, author);
  this.books.push(book);
  this.save();
  this.display();
};

// Save books data in localStorage
ManageBooks.prototype.save = function () {
  if (this.books.length > 0) {
    localStorage.setItem('books', JSON.stringify(this.books));
  } else {
    localStorage.removeItem('books');
  }
};

// Delete book form the books
ManageBooks.prototype.delete = function (e) {
  const { id } = e.target;
  this.books = this.books.filter((book) => id !== book.id);
  this.save();
  this.display();
};

// Display books
ManageBooks.prototype.display = function () {
  const bookList = document.querySelector('.books-list');
  if (this.books.length > 0) {
    bookList.innerText = '';
    // add books in ui
    this.books.forEach((book) => {
      // Single book item
      const li = document.createElement('li');
      li.innerText = `${book.title} by ${book.author}`;
      li.className = 'book-item';

      // Remove button
      const btn = document.createElement('button');
      btn.id = book.id;
      btn.className = 'btn-remove';
      btn.innerText = 'Remove';
      btn.addEventListener('click', (e) => {
        this.delete(e);
      });

      // append li and btn
      li.appendChild(btn);
      bookList.appendChild(li);
    });
  } else {
    bookList.innerText = 'Currently book list is empty';
  }
};

// Control form submition
ManageBooks.prototype.onAddBook = function (e) {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const err = document.querySelector('.error');
  if (title.value.trim() === '' || author.value.trim() === '') {
    err.innerText = 'Book is not added and All the field is required!';
  } else {
    err.innerText = '';
    this.add(title.value, author.value);
    title.value = '';
    author.value = '';
  }
};

// Initialize the ManageBooks constructor
const books = new ManageBooks();

// Load books data on the fly
window.onload = () => {
  books.display();
};

// Add event listner on the form
const addBookForm = document.getElementById('add-book');
addBookForm.addEventListener('submit', (e) => {
  books.onAddBook(e);
});
