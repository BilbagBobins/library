let myLibrary = [];

function Book(title, author, pages, read, notes, index) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.notes = notes
    this.index = index
}

let bookIndex = 0;

function addBookToLibrary(title, author, pages, read, notes) {
    if (!notes) {
        notes = '';
    }
    const newBook = new Book(title, author, pages, read, notes, bookIndex)
    myLibrary.push(newBook);
    bookIndex++;
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'Not read yet');
addBookToLibrary('World War Z', 'Max Brooks', '342', 'Read', 'good book, doesn\'t resemble film');
addBookToLibrary('The Martian', 'Andy Weir', '369', 'Read', 'Apollo 13 crisis for the entire book');
addBookToLibrary('Dune', 'Frank Herbert', '412', 'Not yet read')

function bookTable() {
    const table = document.querySelector('#table tbody');
    table.innerHTML = '';

    myLibrary.forEach(element => {
        const tr = table.insertRow();
        let book = Object.values(element);
        for (i = 0; i < book.length -1; i++) {
            const td = tr.insertCell();
            if (book[i] === book[3]) { 
                //  would have used book.read but I am iterating through values only

                const readButton = document.createElement('button');
                readButton.textContent = 'Read it';
                readButton.setAttribute('id', element.index);
                readButton.addEventListener('click', readBook);
                td.appendChild(document.createTextNode(book[i]));
                td.appendChild(readButton);
            } else {
                td.appendChild(document.createTextNode(book[i]))
            }                     
        }

        const td = tr.insertCell();
        const delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.setAttribute('id', element.index);
        delButton.addEventListener('click', remove);
        td.appendChild(delButton);
    })
}

function submit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="isRead"]:checked').value;
    const notes = document.getElementById('notes').value;
    addBookToLibrary(title, author, pages, read, notes);
    bookForm.reset();
    formContainer.style.display = 'none';
    newBook.style.display = 'block';
    bookTable();
}

function remove() {
    myLibrary = myLibrary.filter(book => book.index != this.id)
    bookTable();
}

function readBook() {
    let bookIndex = myLibrary.findIndex((item => item.index == this.id));
    let book = myLibrary.filter(book => book.index == this.id)

    if (book[0].read === 'Read') {
        book[0].read = 'Not read yet';
    } else {
        book[0].read = 'Read';
    }

    myLibrary[bookIndex] = book[0];

    bookTable();
}

const bookForm = document.getElementById('bookForm');
const formContainer = document.querySelector('.formContainer');
const newBook = document.getElementById('newBookBtn')
newBook.addEventListener('click', () => {
    formContainer.style.display = 'block';
    newBook.style.display = 'none';
});

const submitBook = document.getElementById('submitForm');
submitBook.addEventListener('click', submit);


bookTable();