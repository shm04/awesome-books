/* eslint-disable max-classes-per-file */

const inputOne = document.querySelector('.input-one');
const inputTwo = document.querySelector('.input-two');
const addButton = document.querySelector('.add-button');
const booksSection = document.querySelector('.books-section');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Books {
  constructor() {
    this.bookList = [];
    if (localStorage.getItem('bookList')) {
      this.bookList = JSON.parse(localStorage.getItem('bookList'));
    }
  }

  addBook(book) {
    this.bookList.push(book);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.writeBooks();
  }

  removeBook(title) {
    this.bookList = this.bookList.filter((book) => book.title !== title);
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
    this.writeBooks();
  }

  writeBooks() {
    booksSection.innerHTML = '';
    const list = document.createElement('ul');
    list.classList.add('books-list');
    this.bookList.forEach((book, index) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `
        <h2 class="li-title">${book.title}</h2>
        <p class="li-text">${book.author}</p>
        <button class="remove-btn" id="${index}">Remove</button>
      `;
      list.appendChild(li);
      booksSection.appendChild(list);

      const removeBtn = document.getElementById(`${index}`);
      removeBtn.addEventListener('click', () => this.removeBook(book.title));
    });
  }
}

const books = new Books();

addButton.addEventListener('click', () => {
  const inputOneValue = inputOne.value;
  const inputTwoValue = inputTwo.value;

  if (inputOneValue === '' || inputTwoValue === '') {
    const existingErrorMsg = booksSection.querySelector('.error-msg');
    if (existingErrorMsg) {
      return;
    }
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error-msg');
    errorMsg.innerHTML = 'Please fill both inputs';
    booksSection.appendChild(errorMsg);
  } else {
    const newBook = new Book(inputOneValue, inputTwoValue);
    books.addBook(newBook);
  }

  inputOne.value = '';
  inputTwo.value = '';
});

books.writeBooks();