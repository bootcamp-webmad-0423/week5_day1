const express = require('express')
const { isLoggedIn } = require('../middlewares/route-guard')
const router = express.Router()

const Book = require('../models/Book.model')

// books list
router.get("/listado", (req, res, next) => {

  Book
    .find()
    .select({ title: 1 })         // Solo obtenemos el titulo e ID de la BBDD
    .sort({ title: 1 })           // Ordenamos por título ASC
    .then(books => res.render('books/list-page', { books }))
    .catch(err => console.log(err))
})


// book details
router.get('/detalles/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/details-page', book))
    .catch(err => console.log(err))
})


// new book form (render) - PROTECTED
router.get("/crear", isLoggedIn, (req, res, next) => {
  res.render("books/create-page")
})


// new book form (handler) - PROTECTED
router.post("/crear", isLoggedIn, (req, res, next) => {

  const { title, description, author, rating } = req.body     // los formularios POST llegan a req.body

  Book
    .create({ title, description, author, rating })
    .then(newBook => res.redirect(`/libros/detalles/${newBook._id}`))
    .catch(err => console.log(err))
})


// edit book form (render) - PROTECTED
router.get("/editar/:book_id", isLoggedIn, (req, res, next) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render("books/edit-page", book))
    .catch(err => console.log(err))
})


// edit book form (handler) - PROTECTED
router.post("/editar/:book_id", isLoggedIn, (req, res, next) => {

  const { title, description, author, rating } = req.body
  const { book_id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

  Book
    .findByIdAndUpdate(book_id, { title, description, author, rating })
    .then(() => res.redirect(`/libros/detalles/${book_id}`))
    .catch(err => console.log(err))
})


// delete book (de tipo POST!!!!) - PROTECTED
router.post('/eliminar/:book_id', isLoggedIn, (req, res, next) => {

  const { book_id } = req.params

  Book
    .findByIdAndDelete(book_id)
    .then(() => res.redirect(`/libros/listado`))
    .catch(err => console.log(err))
})


module.exports = router