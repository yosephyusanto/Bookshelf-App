const books = []
const RENDER_EVENT = 'render-books'

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('form-book-submit').addEventListener('submit', function(e){
    e.preventDefault()
    addBook()
  })

  if(isStorageExist()){
    loadDataFromStorage()
  }
})

function addBook(){
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const year = document.getElementById('year').value
  const isComplete = document.getElementById('finish').checked
  console.log(isComplete)
  const id = generateId()


  const object = generateObject(id, title, author, year, isComplete)

  console.log(object)

  books.push(object)

  document.dispatchEvent(new Event(RENDER_EVENT))

  saveData()
}

function generateId(){
  return +new Date()
}

function generateObject(id, title, author, year, isComplete){
  return {id, title, author, year, isComplete}
}

document.addEventListener(RENDER_EVENT, function(){
  const unfinishedRead = document.querySelector('.unfinished-read')
  unfinishedRead.innerHTML = ''
  unfinishedRead.innerHTML = '<h2>List of unfinished read books</h2>'
  const finishRead = document.querySelector('.finish-read')
  finishRead.innerHTML = ''
  finishRead.innerHTML = ' <h2>List of finished read books</h2>'

  for(const book of books){
    const element = makeBook(book)
    if(!book.isComplete){
      unfinishedRead.append(element)
    }
    else{
      finishRead.append(element)
    }
  }
})

function makeBook(book){
  const bookInfoContainer = document.createElement('div')
  bookInfoContainer.classList.add('book-info-container');

  const title = document.createElement('p')
  title.innerText = 'Title: '+ book.title
  title.classList.add('book-title')

  const author = document.createElement('p')
  author.innerText = 'Author: ' + book.author

  const year = document.createElement('p')
  year.innerText = 'Year: ' + book.year

  const button_container = document.createElement('div')
  button_container.classList.add('action')

  bookInfoContainer.append(title, author, year, button_container)

  const delete_button = document.createElement('button')
  delete_button.setAttribute('id', 'delete-btn')
  delete_button.innerText = 'Delete'
  delete_button.addEventListener('click', function(){
    deleteBook(book.id)
  })

  const edit_button = document.createElement('button')
  edit_button.setAttribute('id', 'edit-btn')
  edit_button.innerText = 'Edit Book'
  edit_button.addEventListener('click', function(){
    editBook(book.id)
  })


  if(!book.isComplete){
    const finish_button = document.createElement('button')
    finish_button.setAttribute('id', 'finish-btn')
    finish_button.innerText = 'Finish Read'

    finish_button.addEventListener('click', function(){
      moveBookToFinishread(book.id)
    })

    button_container.append(finish_button, delete_button)
  }
  else{
    const notFinish_button = document.createElement('button')
    notFinish_button.setAttribute('id', 'not-finish-btn')
    notFinish_button.innerText = 'Not Finish'

    notFinish_button.addEventListener('click', function(){
      moveBookToUnfinishread(book.id)
    })
    
    button_container.append(notFinish_button, delete_button)
  }

  return bookInfoContainer
}

function deleteBook(bookID){
  const target = findBookIndex(bookID)
  if(target === -1)return
  books.splice(target, 1)
  document.dispatchEvent(new Event(RENDER_EVENT))

  saveData()
}

function editBook(bookID){
  const target = findBookIndex
  
}

function findBookIndex(bookID){
  for(const idx in books){
    if(books[idx].id == bookID){
      return idx
    }
  }
  return -1
}

function moveBookToFinishread(bookID){
  const target = findBook(bookID)
  if(target === null)return
  target.isComplete = true
  document.dispatchEvent(new Event(RENDER_EVENT))

  saveData()
}

function moveBookToUnfinishread(bookID){
  const target = findBook(bookID)
  if(target === null)return
  target.isComplete = false
  document.dispatchEvent(new Event(RENDER_EVENT))

  saveData()
}

function findBook(bookID){
  for(const book of books){
    if(book.id === bookID){
      return book
    }
  }
  return null
}


const STORAGE_KEY = 'Bookshelf-App'
const SAVED_EVENT = 'saved-book'

function saveData(){
  if(isStorageExist()){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    document.dispatchEvent(new Event(SAVED_EVENT))
  }
}

document.addEventListener(SAVED_EVENT, function(){
  console.log(localStorage.getItem(STORAGE_KEY))
})

function isStorageExist(){
  if(typeof(Storage) !== undefined){
    return true;
  }
  else{
    alert("Your browser doesn't support web storage")
    return false
  }
}

function loadDataFromStorage(){
  const getData = localStorage.getItem(STORAGE_KEY)

  let data = JSON.parse(getData)
  
  if(data != null){
    for(const bookInfo of data){
      books.push(bookInfo)
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT))
}

//filter feature
document.getElementById('filter').addEventListener('submit', function(){
  let filter = document.getElementById('search-book').value
  

})