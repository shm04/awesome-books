/* eslint-disable max-classes-per-file */

const inputOne = document.querySelector('.input-one');
const inputTwo = document.querySelector('.input-two');
const addButton = document.querySelector('.add-button');
const booksSection = document.querySelector('.books-section');
const listLink = document.getElementById('list');
const mainContainer = document.querySelector('.main-container');
const addLink = document.getElementById('add-new');
const contactLink = document.getElementById('contact');
const formContainer = document.querySelector('.form-container');
const contactSection = document.querySelector('.contact-section');
const textLink = document.getElementById('text-link');
const errorMsgDiv = document.querySelector('.error-msg-div');

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
    this.mainText = document.querySelector('.main-text');
    this.dateTime = document.querySelector('.date-time');
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
    this.addNewMsg();
  }

  writeBooks() {
    booksSection.innerHTML = '';
    const list = document.createElement('ul');
    list.classList.add('books-list');
    this.bookList.forEach((book, index) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.innerHTML = `
      <div class="books-info">
        <h2 class="li-title">"${book.title}"</h2>
        <p class="li-text">by ${book.author}</p>
      </div>
        <button class="remove-btn" id="${index}">Remove</button>
      `;
      list.appendChild(li);
      booksSection.appendChild(list);

      const removeBtn = document.getElementById(`${index}`);
      removeBtn.addEventListener('click', () => this.removeBook(book.title));
    });
  }

  addNewMsg() {
    if (booksSection.children.length > 0) {
      this.mainText.style.display = 'none';
    } else if (booksSection.children.length <= 0) {
      this.mainText.style.display = 'block';
    }
  }

  updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    this.dateTime.textContent = dateTimeString;
  }
}

const books = new Books();

addButton.addEventListener('click', () => {
  const inputOneValue = inputOne.value.trim();
  const inputTwoValue = inputTwo.value.trim();

  if (inputOneValue === '' || inputTwoValue === '') {
    const existingErrorMsg = errorMsgDiv.querySelector('.error-msg');
    if (existingErrorMsg) {
      return;
    }
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('error-msg');
    errorMsg.innerHTML = 'Please fill both inputs';
    errorMsgDiv.appendChild(errorMsg);
  } else {
    errorMsgDiv.innerHTML = '';
    const newBook = new Book(inputOneValue, inputTwoValue);
    books.addBook(newBook);
    books.addNewMsg();
  }

  inputOne.value = '';
  inputTwo.value = '';
});

books.writeBooks();

books.updateDateTime();
setInterval(books.updateDateTime, 1000);

// Listeners to navbar sections

listLink.addEventListener('click', () => {
  listLink.style.color = 'blue';
  listLink.style.textDecoration = 'underline';
  addLink.style.color = 'black';
  addLink.style.textDecoration = 'none';
  contactLink.style.color = 'black';
  contactLink.style.textDecoration = 'none';
  mainContainer.style.display = 'flex';
  formContainer.style.display = 'none';
  contactSection.style.display = 'none';
});

addLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'blue';
  addLink.style.textDecoration = 'underline';
  contactLink.style.color = 'black';
  contactLink.style.textDecoration = 'none';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'flex';
  contactSection.style.display = 'none';
});

textLink.addEventListener('click', () => {
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'blue';
  addLink.style.textDecoration = 'underline';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'flex';
  contactSection.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  contactLink.style.color = 'blue';
  contactLink.style.textDecoration = 'underline';
  listLink.style.color = 'black';
  listLink.style.textDecoration = 'none';
  addLink.style.color = 'black';
  addLink.style.textDecoration = 'none';
  mainContainer.style.display = 'none';
  formContainer.style.display = 'none';
  contactSection.style.display = 'flex';
});
