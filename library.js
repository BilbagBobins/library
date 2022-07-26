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
addBookToLibrary('Dune', 'Frank Herbert', '412', 'Not yet read', 'really really long notes section that may or may not fit withing the allocated space and may or may not make things look janky as a really janky thing')
addBookToLibrary('Really really long title that may or may not fit withing the allocated space and may or may not make things look janky as', 'CatDog', '555', 'Not yet read', 'Notey notes')
addBookToLibrary('The Martian', 'Andy Weir', '369', 'Read', 'Apollo 13 crisis for the entire book');

function bookTable() {
    tableContainer.innerHTML = '';
    pageContainer.innerHTML = '';
    viewIndicator = 'table';

    const table = document.createElement('table');
    
    const thead = table.createTHead();
    const headRow = thead.insertRow(0);

    if (myLibrary[0]) {
        const keys = Object.keys(myLibrary[0]);

        for (i = 0; i < keys.length -1; i++){
            const td = headRow.insertCell();
            keyCap = keys[i][0].toUpperCase() + keys[i].substring(1);
            td.appendChild(document.createTextNode(keyCap));
        }

        const tbody = table.createTBody();
        myLibrary.forEach(element => {
            const tr = tbody.insertRow();
            let book = Object.values(element);
            for (i = 0; i < book.length -1; i++) {
                const td = tr.insertCell();
                if (book[i] === book[3]) { 
                    //  would have used book.read but I am iterating through values only

                    const readButton = document.createElement('button');
                    readButton.textContent = 'Read it';
                    readButton.setAttribute('id', element.index);
                    readButton.setAttribute('class', 'readButton');
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
            delButton.setAttribute('class', 'delButton');
            delButton.addEventListener('click', remove);
            td.appendChild(delButton);
        })
        tableContainer.appendChild(table);
    } else {
        tableContainer.innerHTML = '';
    }
}

function bookPage() {
    viewIndicator = 'page';
    tableContainer.innerHTML = '';
    pageContainer.innerHTML = '';

    myLibrary.forEach(element => {
        const page = document.createElement('div');
        page.setAttribute('class', 'bookPage');
        let bookValue = Object.values(element);
        let bookKey = Object.keys(element);
        for (i = 0; i < bookValue.length -1; i++) {
            const key = document.createElement('h3');
            key.textContent = bookKey[i][0].toUpperCase() + bookKey[i].substring(1);
            page.appendChild(key);

            const value = document.createElement('p');
            value.textContent = bookValue[i];
            if (key.textContent === 'Read') {  
                const readDiv = document.createElement('div');
                const readButton = document.createElement('button');
                readButton.textContent = 'Read it';
                readButton.setAttribute('id', bookValue[5]);
                readButton.setAttribute('class', 'readButton');
                readButton.addEventListener('click', readBook);
                readDiv.appendChild(value);
                readDiv.appendChild(readButton);
                page.appendChild(readDiv);
            } else {
                page.appendChild(value);
            }
        }
        const delButton = document.createElement('button');
        delButton.textContent = 'Delete';
        delButton.setAttribute('id', element.index);
        delButton.setAttribute('class', 'delButton');
        delButton.addEventListener('click', remove);
        page.appendChild(delButton);

        pageContainer.appendChild(page);
    })
}

function submit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="isRead"]:checked').value;
    const notes = document.getElementById('notes').value;
    if (title && author && pages) {
        addBookToLibrary(title, author, pages, read, notes);
        bookForm.reset();
        formContainer.style.display = 'none';
        newBook.style.display = 'block';
        if (viewIndicator === 'table') {

        }
        viewModeRefresh();
    } else {
        alert('Fill out Title, Author and Pages');
    }
}

function cancelBook() {
    bookForm.reset();
    formContainer.style.display = 'none';
    newBook.style.display = 'block';
}

function remove() {
    myLibrary = myLibrary.filter(book => book.index != this.id)
    viewModeRefresh();
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

    viewModeRefresh();
}

function viewModeSwitch() {
    if (viewIndicator === 'table') {
        bookPage();
    } else if (viewIndicator === 'page') {
        bookTable();
    }
}

function viewModeRefresh() {
    if (viewIndicator === 'page') {
        bookPage();
    } else if (viewIndicator === 'table') {
        bookTable();
    }
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
const cancelForm = document.getElementById('cancelForm');
cancelForm.addEventListener('click', cancelBook);

let viewIndicator = '';
const viewMode = document.getElementById('viewMode').addEventListener('click', viewModeSwitch);

const tableContainer = document.getElementById('table-container');
const pageContainer = document.getElementById('page-container');

bookPage();