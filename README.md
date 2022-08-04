# Library

## <u>The Brief</u>

This is the Library project as part of The Odin Project.

We are required to expand upon last lesson about objects and object constructors and build a basic library app.

Each book in the library will be created using a constructor and it will hold a title, an author, number of pages, wether it has been read or not and anything else we might want. Each book is then to be stored in a simple array.
Looping through the array we are then required to display the details of each book. We can display this info either in a table or each book on their own "card".

There needs to be a function to give the user the ability to add a new book, delete a book and also the  ability to change a book's read status.

We are not required to add any type of storage at this stage. Any information that is added will not be saved after refreshing the page. Because of this we are advised to add a few books within the JavaScript code.

## <u>The Build</u>

I started out with the book constructor and the library array to hold all the books. Then I added the `addBookToLibrary()` function that took inputs for each value of a book and combines them into a new book and adds it to the library. Each value is retreived from a form on the webpage that the user fills out. Some simple form validation ensured each of the fields were filled out.

I had to use the `preventDefault()` function when submiting this form because traditionally the page would refresh on submission and because the new books are stored in the webpage and not on a server they would just disappear when the page refreshed.

### Table layout

At first I decided to display everything in a table. I hard coded the table and headings into the HTML and dynamically displayed the contents of the library using a `forEach` loop to get each book and then a  `for` loop to get the values of each book.

The read column of the table would also house a button to toggle the read status of the book. When the loop got to the 'read' column it would create a button and add a `'click' eventListener` activating the `readBook()` function before it appended it to the table.

At the end of each book loop I added a delete button that would be displayed at the end of each row of the table.

### Button functions

To be able to identify which book is to be deleted or which book read status to change when the respective button is clicked, I had to add an index value to each book which was sourced from the `bookIndex` counter which incremented when each book is added to the library. This same index number was also given to the button ID so that when the button is clicked the ID of the button will be matched against the `book.index`.


#### *remove()*
To remove a book I utilised the `filter()` method to create a new array of books whose IDs do not match that of the button clicked. Once the book was removed I refreshed the page to display the new contents of the library array.

#### <i>readBook()</i>
To change the read status of a book I used the `findIndex()` to get the array index of the book that has the ID matching that of the button clicked. Getting this value meant I could insert the altered book back into the library using that index value. For example `myLibrary[bookIndex]`

To get the book that I wanted I used `filter()` to match the book.index value to that of the button ID. Because `filter()` returns an array, when it came to changing the 'read' value, I had to index into the book with `book[0]`.

### Page layout

Once I got the table displaying correctly I wanted to try to displaying the books on separate DOM elements and make use of the grid layout from a few lessons back. Instead of getting rid of the table I decided I wanted to add the ability for the user to toggle between the table layout and a page layout.

The process was similar to populating a table, with a `for` loop within a `forEach` loop, but instead of writing to a new row I would write to a new DOM element within a container.

I could have used 2 different buttons to change which layout the user wanted but instead I decided to use one and have it toggle between the two layouts. I created a variable that would change depending on which layout had just been loaded and created a function that generated a different layout depending on the value of that variable.

Having 2 states that you can toggle between meant that the HTML hard coded table elements would now have to be generated in JS so as to give a clean slate each time the layout is switched. To clean out the previous layout I used `.innerHTML = ''` on each of the layout's container.

I wanted to capitalise the first letter of each of the keys of each book. To do that I indexed into the string at position `[0]` and `toUpperCase()` that letter. Then I combined it back with the substring starting at the `[1]` index.

### Styling effects

With both layouts displaying correctly and the switching function working I decided to add some transition effects to the process of switching layouts, deleting a book, and to the new book form.

These fade out and in effects were done by combining an opacity change with a `setTimeout()` function in JS and `transition: time ease opactity;` in the CSS. The opacity would slowly change dependent on the time value set in the CSS, and the timeout would hold off refreshing the page until that fade had completed.