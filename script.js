const inputOne = document.querySelector('.input-one');
const inputTwo = document.querySelector('.input-two');
const addButton = document.querySelector('.add-button');
const booksSection = document.querySelector('.books-section');

let bookList = [];

const writeBook = () => {
  booksSection.innerHTML = '';

  const list = document.createElement('ul');
  list.classList.add('books-list');

  bookList.forEach((book, index) => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = `
    <h2 class="li-title">${book.title}</h2>
    <p class="li-text">${book.author}</p>
    <button class="remove-btn" id="${index}">Remove</button>
    `;

    list.appendChild(li);
    booksSection.appendChild(list);

    const removeBook = (title) => {
      bookList = bookList.filter((book) => book.title !== title);
      localStorage.setItem('bookList', JSON.stringify(bookList));
      writeBook();
    };

    const removeBtn = document.getElementById(`${index}`);
    removeBtn.addEventListener('click', () => removeBook(book.title));
  });
};

if (localStorage.getItem('bookList')) {
  bookList = JSON.parse(localStorage.getItem('bookList'));
  writeBook();
}

addButton.addEventListener('click', () => {
  const newBook = { title: `${inputOne.value}`, author: `${inputTwo.value}` };

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
    bookList.push(newBook);
    localStorage.setItem('bookList', JSON.stringify(bookList));
    writeBook();
  }

  inputOne.value = '';
  inputTwo.value = '';
});
