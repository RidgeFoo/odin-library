const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;
  this.info = function () {
    const readMsg = this.read ? "is read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`;
  };
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// Setup some dummy books
myLibrary.push(
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true),
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true),
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true)
);

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  displayBooks();
}

/*
Create book cards
Clearing out the child nodes because the index will be incorrect if we delete books
The index position is used to delete the books
*/
function displayBooks() {
  const main = document.querySelector("main");
  /*
  Need to do it this way as childNodes is a live collection so you can't just iterate over it. 
  You need something static which is where the Array.From comes in.
  If you were to iterate over the childNodes directly it will skip nodes out as you delete them.
  */
  Array.from(main.childNodes).forEach((child) => child.remove());

  myLibrary.forEach((book, index) => {
    let bookCard = getBookCard(book, index);
    main.append(bookCard);
  });
}

function getBookCard(book, indexNumber) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.setAttribute("bookIndex", indexNumber);

  const title = document.createElement("h2");
  title.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = `✍️ ${book.author}`;
  const pages = document.createElement("p");
  pages.textContent = `📑 ${book.pages}`;

  const lastRow = document.createElement("div");
  lastRow.classList.add("isReadDelete");

  lastRow.append(getIsReadButton(book.isRead), getDeleteButton());
  bookCard.append(title, author, pages, lastRow);

  return bookCard;
}

function getIsReadButton(isRead) {
  const button = document.createElement("button");
  button.className = "isRead";
  button.textContent = isRead ? `👓 ✅` : `👓 ❌`;
  button.addEventListener("click", () => {
    const index = button.parentElement.parentElement.getAttribute("bookIndex");
    myLibrary[index].toggleRead();
    displayBooks();
  });
  return button;
}

function getDeleteButton() {
  const button = document.createElement("button");
  button.className = "deleteBook";
  button.textContent = "🗑";

  button.addEventListener("click", () => {
    const index = button.parentElement.parentElement.getAttribute("bookIndex");
    myLibrary.splice(index, 1);
    displayBooks();
  });

  return button;
}

// Open and close the book adding modal and overlay accordingly
const addBook = document.querySelector("#add-book");
const cancel = document.querySelector("#cancel");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");

for (let element of [addBook, cancel, modalOverlay]) {
  element.addEventListener("click", displayModal);
}

function displayModal() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

// Get form data - not using submit as this causes the page to refresh
const form = document.querySelector("#book");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if inputs are valid when submitting if not then don't go ahead
  const inputs = Array.from(form.querySelectorAll("input"));
  // Using an array as you can't break out of forEach
  for (let el of inputs) {
    if (!el.checkValidity()) return;
  }

  addBookToLibrary(
    form.elements.title.value,
    form.elements.author.value,
    form.elements.pages.value,
    form.elements.isRead.checked
  );

  // Clear inputs
  inputs.forEach((el) => (el.value = ""));

  displayModal();
});

// Display our already created books
displayBooks();
