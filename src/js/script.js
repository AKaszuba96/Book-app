/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

'use strict';

const select = {
    template: '#template-book',
    
    class: {
        booksList: '.books-list',
        filtersForm: '.filters',
    },
};

const classNames = {
    bookImage: 'book__image',
    bookFavorite: 'favorite',
    bookHidden: 'hidden',

};

const attributeNames = {
    bookId: 'data-id',
};

class BookList{
    constructor(data){

        const thisBookList = this;

        thisBookList.data = data;

        thisBookList.renderBooks();
        thisBookList.getElements();
        thisBookList.initActions();
    }

    renderBooks(){

        const thisBookList = this;

        /* generate HTML based on template */
        const bookTemplate = Handlebars.compile(document.querySelector(select.template).innerHTML);

        for(let book of thisBookList.data.books){
            // console.log(book);
            const generateHTML = bookTemplate(book);

            /* create element using utils from functions*/
            const DOMelement = utils.createDOMFromHTML(generateHTML);
            // console.log(DOMelement);

            /* find book's list */
            const booksList = document.querySelector(select.class.booksList);

            /* add element to list */
            booksList.appendChild(DOMelement);
            // console.log('dodano element do listy');
        }
    }

    initActions(){

        const thisBookList = this;

        // find book's list
        const booksList = document.querySelector(select.class.booksList);
    
        /* do nothing when one click */
        booksList.addEventListener('click', function(event){
            event.preventDefault();
        });
    
        /* add listener for double click */
        booksList.addEventListener('dblclick', function(event){
            event.preventDefault();
            // console.log('wykryto double click');
    
            const bookElem = event.target.offsetParent; // nasłuchujemy eventu na całej liście książek; event odnosi sie konkretnie do image, więc musimy wziąc jeo rodzica aby nadać klasę favorite 
    
            if(bookElem.classList.contains(classNames.bookImage)){

                /* get book-id*/
                const bookId = bookElem.getAttribute(attributeNames.bookId);
                // console.log(bookId);
    
                if(thisBookList.favoriteBooks.includes(bookId)){
                    /* remove class "favorite" to .book__image */
                    bookElem.classList.remove(classNames.bookFavorite);
                    // console.log('usunięto klasę favorite');
    
                    /* remove id of book to favoriteBooks list */
                    const indexId = thisBookList.favoriteBooks.indexOf(bookId);
                    thisBookList.favoriteBooks.splice(indexId, 1);
    
                }else {
                    /* add class "favorite" to .book__image */
                    bookElem.classList.add(classNames.bookFavorite);
                    // console.log('dodano klasę favorite');
    
                    /* add id of book to favoriteBooks list */
                    thisBookList.favoriteBooks.push(bookId);
    
                }
    
                // console.log(thisBookList.favoriteBooks);
            }
        });
    
        // find form filters
        const filtersForm = document.querySelector(select.class.filtersForm);
    
        /* add Listener for click */
        filtersForm.addEventListener('click', function(event){
            const filter = event.target;
    
            if(filter.tagName === "INPUT" && filter.type === "checkbox" && filter.name === "filter"){
                // console.log('filter:', filter.value);
                
                if(filter.checked){
                    // true
                    thisBookList.filters.push(filter.value);
                }else {
                    thisBookList.filters.splice(thisBookList.filters.indexOf(filter.value), 1);
                }
            }
    
            // console.log('filters list:', thisBookList.filters);
            thisBookList.booksFilter();
        });
    }

    booksFilter(){

        const thisBookList = this;

         /* get id's of books which should be hidden  */

        for(let filter of thisBookList.filters){
            // console.log('filter from filters:', filter);
            for(let book of thisBookList.data.books){
                if(!book.details[filter]){
                    // false
                    if(!thisBookList.hiddenBooks.includes(book.id)){
                        thisBookList.hiddenBooks.push(book.id);
                    }
                }
            }
        }

        // console.log('hiddenBooks:', thisBookList.hiddenBooks);

        /* hide books from list */
        const bookLinks = document.getElementsByClassName(classNames.bookImage);

        for(let bookLink of bookLinks){
            // console.log(bookLink);
            if(thisBookList.hiddenBooks.includes(parseInt(bookLink.getAttribute(attributeNames.bookId)))){
                bookLink.classList.add(classNames.bookHidden);
            }else {
                bookLink.classList.remove(classNames.bookHidden);
            }
        }

        thisBookList.hiddenBooks = [];
    }

    getElements(){
        const thisBookList = this;

        thisBookList.favoriteBooks = [];
        thisBookList.filters = [];
        thisBookList.hiddenBooks = [];
    }
}

const app = new BookList(dataSource);
console.log(app);

// old code - without OOP
// function renderBooks(data){

//     /* generate HTML based on template */
//     const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

//     for(let book of data.books){
//         // console.log(book);
//         const generateHTML = bookTemplate(book);

//         /* create element using utils from functions*/
//         const DOMelement = utils.createDOMFromHTML(generateHTML);
//         // console.log(DOMelement);

//         /* find book's list */
//         const booksList = document.querySelector('.books-list');

//         /* add element to list */
//         booksList.appendChild(DOMelement);
//         console.log('dodano element do listy');
//     }  
// }

// renderBooks(dataSource);


// const favoriteBooks = [];
// const filters = [];

// function initAcions(){

//     // find book's list */
//     const booksList = document.querySelector('.books-list');

//     /* do nothing when one click */
//     booksList.addEventListener('click', function(event){
//         event.preventDefault();
//     });

//     /* add listener for double click */
//     booksList.addEventListener('dblclick', function(event){
//         event.preventDefault();
//         console.log('wykryto double click');

//         const bookElem = event.target.offsetParent;

//         if(bookElem.classList.contains('book__image')){

//             console.log('zawiera');

//             /* get book-id*/
//             const bookId = bookElem.getAttribute('data-id');
//             console.log(bookId);

//             if(favoriteBooks.includes(bookId)){
//                 /* remove class "favorite" to .book__image */
//                 bookElem.classList.remove('favorite');
//                 console.log('usunięto klasę favorite');

//                 /* remove id of book to favoriteBooks list */
//                 const indexId = favoriteBooks.indexOf(bookId);
//                 favoriteBooks.splice(indexId, 1);

//             }else {
//                 /* add class "favorite" to .book__image */
//                 bookElem.classList.add('favorite');
//                 console.log('dodano klasę favorite');

//                 /* add id of book to favoriteBooks list */
//                 favoriteBooks.push(bookId);

//             }

//             console.log(favoriteBooks);
//         }
//     });

//     // find form filters */
//     const filtersForm = document.querySelector('.filters');

//     /* add Listener for click */
//     filtersForm.addEventListener('click', function(event){
//         const filter = event.target;

//         if(filter.tagName === "INPUT" && filter.type === "checkbox" && filter.name === "filter"){
//             console.log(filter.value);
            
//             if(filter.checked){
//                 // true
//                 filters.push(filter.value);
//             }else {
//                 filters.splice(filters.indexOf(filter.value), 1);
//             }
//         }

//         console.log(filters);
//         booksFilter(filters, dataSource.books);
//     });
// }

// function booksFilter(filters, books){

//     /* get id's of books which should be hidden  */
//     const hiddenBooks = [];

//     for(let filter of filters){
//         console.log(filter);
//         for(let book of books){
//             if(!book.details[filter]){
//                 // false
//                 if(!hiddenBooks.includes(book.id)){
//                     hiddenBooks.push(book.id);
//                 }
//             }
//         }
//     }

//     console.log(hiddenBooks);

//     /* hide books from list */
//     const bookLinks = document.getElementsByClassName('book__image');
//     for(let bookLink of bookLinks){
        
//         if(hiddenBooks.includes(parseInt(bookLink.getAttribute('data-id')))){
//             bookLink.classList.add('hidden');
//         }else {
//             bookLink.classList.remove('hidden');
//         }
//     }
// }

// initAcions();

