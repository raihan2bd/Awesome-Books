import Book from './book.js';

// Select some dom element
// Add event on the header nav-item
const navItems = document.querySelectorAll('.nav-item');
const bookSection = document.querySelector('.books-section');
const addBookSection = document.querySelector('.add-book-section');
const contractSection = document.querySelector('.contact-section');

// show Date in html
document.getElementById('show-date').innerText = new Date();

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
        li.innerHTML = `<h4><span class="book-name">${book.title}</span> by <span class="book-author">${book.author}</span></h4>`;
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
      bookSection.classList.add('slide-in');
      addBookSection.classList.remove('slide-in');
      contractSection.classList.remove('slide-in');
      document.getElementById('add-new-book').classList.remove('active');
      document.getElementById('books').classList.add('active');
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

// This function is use for the single page
const addNavSection = (e) => {
  const { id } = e.target;
  e.target.classList.add('active');
  if (id === 'books') {
    bookSection.classList.add('slide-in');
    addBookSection.classList.remove('slide-in');
    contractSection.classList.remove('slide-in');
  } else if (id === 'add-new-book') {
    bookSection.classList.remove('slide-in');
    addBookSection.classList.add('slide-in');
    contractSection.classList.remove('slide-in');
  } else if (id === 'contact-us') {
    bookSection.classList.remove('slide-in');
    addBookSection.classList.remove('slide-in');
    contractSection.classList.add('slide-in');
  }
};

navItems.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    navItems.forEach((n) => {
      n.classList.remove('active');
    });
    addNavSection(e);
  });
});
