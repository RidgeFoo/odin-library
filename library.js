let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    // Not sure why I need this.read in this instance for this to work properly
    const readMsg = this.read ? "is read" : "not read yet";
    return `${title} by ${author}, ${pages} pages, ${readMsg}`;
  };
}

myLibrary.push(
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true),
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true),
  new Book("Becoming a Supple Leopard", "Kelly Starrett", 283, false),
  new Book("Ego is the Enemy", "Ryan Holiday", 150, true)
);

function addBookToLibrary() {}

function displayBooks() {
  const main = document.querySelector("main");
  for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");

    const h2Title = document.createElement("h2");
    h2Title.textContent = book.title;
    const pAuthor = document.createElement("p");
    pAuthor.textContent = `✍️ ${book.author}`;
    const pPages = document.createElement("p");
    pPages.textContent = `📑 ${book.pages}`;

    bookCard.append(h2Title, pAuthor, pPages);
    main.append(bookCard);
  }
}

displayBooks();

const openModal = document.querySelector("#open-modal");
const closeModal = document.querySelector("#close-modal");
const addBook = document.querySelector("#add-book");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");

for(el of [openModal, closeModal, addBook, modalOverlay]) {
   el.addEventListener("click", displayModal);
}

function displayModal() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}
