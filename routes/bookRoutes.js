const express = require('express');
const Book = require('../models/book');
const router = express.Router();

router.get('/books', async (req, res) => {
    const books = await Book.find()
    res.status(200).send(books)
})
router.get('/books/:id', async (req,res,) => {
    const infoID = req.params.id   
    const findBook = await Book.findById(infoID)

    if (!findBook) res.status(404).send("Not found")
    else res.status(200).send(findBook)
})

router.post('/books', async (req, res) => {
    const { title, author, genre, publishedYear, isAvailable } = req.body;

    const newBook = new Book({
        title,
        author,
        genre,
        publishedYear,
        isAvailable,
    });
    newBook
        .save()
        .then((savedBook) => {
            res.status(201).send(savedBook);
        })
        .catch((error) => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});
router.patch('/books/:id', async (req,res) => {
    const findID = req.params.id
    const query = await Book.findByIdAndUpdate(findID,req.body)
    res.send(query).status(200)
 })
 router.delete('/books/:id', async (req,res) => {
    const findID = req.params.id
    const query = await Book.findByIdAndDelete(findID)
    res.send(query).status(204)
 })

module.exports = router;
