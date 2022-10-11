///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////BookForm//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

const form = document.getElementById('form')
form.addEventListener('submit', submitFormHandler)

const titleInput = form.querySelector('#book-title')
const authorInput = form.querySelector('#book-author')
const linkInput = form.querySelector('#book-author-link')

const submitBtn = form.querySelector('#submit')

let valid = null

let flag = function validExam(){
    let variable = isValid(authorInput.value) && isValid(titleInput.value) && isValid(linkInput.value)
    return !!variable
}

linkInput.addEventListener('input', () => {
    if (isValid(authorInput.value) && isValid(titleInput.value) && isValid(linkInput.value)){
        valid = true
        console.log(flag)

    } else {
        valid = null
    }
    submitBtn.disabled = (!valid)
})

titleInput.addEventListener('input', () => {
    if (isValid(authorInput.value) && isValid(titleInput.value) && isValid(linkInput.value)){
        valid = true

    } else {
        valid = null

    }

    submitBtn.disabled = (!valid)
})

authorInput.addEventListener('input', () => {
    if (isValid(authorInput.value) && isValid(titleInput.value) && isValid(linkInput.value)){
        valid = true

    } else {
        valid = null
    }
    submitBtn.disabled = (!valid)
})

// let bookBtn = document.getElementById('to-server')
// bookBtn.addEventListener('click', getBooks)

function getBooks() {
    Http.getBooks()
        .then(response => renderList(response))
}

function submitFormHandler(event) {
    event.preventDefault()

    if (valid) {
        const book = {
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            link: linkInput.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
        // Async request to server to save question
        console.log(book)
        Http.createBook(book)
            .then(() => {
                titleInput.value = ''
                authorInput.value = ''
                linkInput.value= ''
                titleInput.className = ''
                authorInput.className = ''
                linkInput.className = ''
                submitBtn.disabled = false
            })
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////AuthorForm//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


let authorBtn = document.getElementById('get-authors')
authorBtn.addEventListener('click', getAuthors)


const authorForm = document.getElementById('form-author')
authorForm.addEventListener('submit', authorSubmitFormHandler)

const authorFormAuthorInput = authorForm.querySelector('#author-title')
const authorFormGenresInput = authorForm.querySelector('#author-genres')

const authorSubmitBtn = authorForm.querySelector('#author-submit')

let authorValidFlag = null

authorFormAuthorInput.addEventListener('input', () => {
    if (!isValid(authorFormAuthorInput.value) && !isValid(authorFormGenresInput.value)){
        authorValidFlag = true

    }
    authorSubmitBtn.disabled = (!isValid(authorFormAuthorInput.value) || !isValid(authorFormGenresInput.value))
})

authorFormGenresInput.addEventListener('input', () => {
    if (!isValid(authorFormAuthorInput.value) && isValid(authorFormGenresInput.value)){
        authorValidFlag = true

    }
    authorSubmitBtn.disabled = (!isValid(authorFormAuthorInput.value) || !isValid(authorFormGenresInput.value))
})

function getAuthors() {
    Http.getAuthors()
        .then(response => renderAuthorsList(response))

}

function authorSubmitFormHandler(event) {
    event.preventDefault()

    if (authorValidFlag) {
        const author = {
            author: authorFormAuthorInput.value.trim(),
            genres: authorFormGenresInput.value.trim(),
            date: new Date().toJSON()
        }

        authorSubmitBtn.disabled = true
        // Async request to server to save question
        console.log(author)
        Http.createAuthor(author)
            .then(() => {
                authorFormAuthorInput.value = ''
                authorFormGenresInput.value = ''
                authorFormAuthorInput.className = ''
                authorFormGenresInput.className = ''
                authorSubmitBtn.disabled = false
            })
    }
}



let processBtn = document.getElementById('get-now-reading-books')
processBtn.addEventListener('click', getProcessBooks)

let processPastBtn = document.getElementById('get-past-reading-books')
processPastBtn.addEventListener('click', getPastProcessBooks)

let processWillBtn = document.getElementById('get-will-reading-books')
processWillBtn.addEventListener('click', getWillProcessBooks)

function getProcessBooks() {
    Http.getBookProcess()
        .then(response => {
            console.log(response)
            renderNowReadingList(response)

        })
}

function getPastProcessBooks() {
    Http.getBookProcess()
        .then(response => {
            console.log(response)
            renderPastReadingList(response)

        })
}

function getWillProcessBooks() {
    Http.getBookProcess()
        .then(response => {
            console.log(response)
            renderWillReadingList(response)

        })
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////VALIDATION//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
function isValid(value) {
    return value.length >= 3
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////AsyncRequests//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
class Http {

    static getBooks(){
        return fetch('https://test-93052-default-rtdb.firebaseio.com/books.json')
            .then(response => response.json())
            .then((response) => {
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static createBook(book){
        return fetch('https://test-93052-default-rtdb.firebaseio.com/books.json',{
            body: JSON.stringify(book),
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        })
    }

    static getAuthors(){
        return fetch('https://test-93052-default-rtdb.firebaseio.com/authors.json')
            .then(response => response.json())
            .then((response) => {
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static createAuthor(author){
        return fetch('https://test-93052-default-rtdb.firebaseio.com/authors.json',{
            body: JSON.stringify(author),
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}
        })
    }

    static getBookProcess(){
        return fetch('https://test-93052-default-rtdb.firebaseio.com/readingProcess.json')
            .then(response => response.json())
            // .then((response) => console.log(response))
            .then((response) => {

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Utils/////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function renderList(books) {

    const html = books.length
        ? books.map(toCard).join('')
        : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`

    const list = document.getElementById('list')

    list.innerHTML = html
}

function toCard(book) {
    return `
    <div class="mui--text-black-54">
      ${new Date(book.date).toLocaleDateString()}
      ${new Date(book.date).toLocaleTimeString()}
    </div>
    <div>${book.title}</div>
    <div>${book.author}</div>
    <br>
  `
}

function renderAuthorsList(author) {

    const html = author.length
        ? author.map(toAuthorsCard).join('')
        : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`

    const list = document.getElementById('author-list')

    list.innerHTML = html
}

function toAuthorsCard(author) {
    return `
    <div class="mui--text-black-54">
      ${new Date(author.date).toLocaleDateString()}
      ${new Date(author.date).toLocaleTimeString()}
    </div>
    <div>${author.author}</div>
    <div>${author.genres}</div>
    <br>
  `
}

function renderNowReadingList(data) {
    console.log(data)
    let titles = data[0].title
    const html = titles.length
        ? titles.map(t => toProcessReadingCard(t)).join('')
        : `<div class="mui--text-headline">Вы пока ничего не читали</div>`

    const list = document.getElementById('process-now-book-list')

    list.innerHTML = html
}

function renderPastReadingList(data) {
    console.log(data)
    let titles = data[1].title
    const html = titles.length
        ? titles.map(t => toProcessReadingCard(t)).join('')
        : `<div class="mui--text-headline">Вы пока ничего не читали</div>`

    const list = document.getElementById('process-past-book-list')

    list.innerHTML = html
}

function renderWillReadingList(data) {
    console.log(data)
    let titles = data[2].title
    const html = titles.length
        ? titles.map(t => toProcessReadingCard(t)).join('')
        : `<div class="mui--text-headline">Вы пока ничего не читали</div>`

    const list = document.getElementById('process-will-book-list')

    list.innerHTML = html
}



function toProcessReadingCard(title) {
    return `
    <div>${title}</div>
    <br>
  `
}

let authorsEls= Array.from(document.getElementsByClassName('authors-content'))
let authorImages = Array.from(document.getElementsByClassName('author-img'))

window.onload = function(){
    Http.getBooks()
        .then(books => {

            books.reverse()
            //books = books.slice(0, 4)
            authorImages.map((img, idx) => {
                img.src = books[idx].link
            })
            authorsEls.map((el, idx) => {
                el.innerHTML =
                    `<ol><li>${books[idx].author}</li></ol>
                    <ol><li>${books[idx].title}</li></ol>
                    <ol><li>${new Date(books[idx].date).toLocaleTimeString()}</li></ol>
                    <ol><li>${new Date(books[idx].date).toLocaleDateString()}</li></ol>
            `
            })
        })

}