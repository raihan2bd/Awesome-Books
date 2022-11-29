import Book from './book.js';
// Books constructor will manage books.
class ManageBooks {
  constructor() {
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
    } else {
      this.books = [];
    }
  }

  // Add book in Books constructor
  add(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.save();
    this.display();
  }

  // Save books data in localStorage
  save() {
    if (this.books.length > 0) {
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      localStorage.removeItem('books');
    }
  }

  // Delete book form the books
  delete(e) {
    const { id } = e.target;
    this.books = this.books.filter((book) => id !== book.id);
    this.save();
    this.display();
  }

  // Display books
  display() {
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
  }

  // Control form submition
  onAddBook(e) {
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
  }
}

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
