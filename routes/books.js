const express = require('express')
const router = express.Router()
const Book =require('../models/book');



const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    pages: 328,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
  },
];


// router.get("/", (req, res) => {
//   res.send("Welcome to homepage");
// });

router.get("/", async(req, res) => {
  // const books =await Book.find()// to list all books
const books = await Book.find({author:/\bbond\b/i})
  res.json(books);
  
});

router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
 
  const book = books.find((t) => t.id === bookId);
  
  if(!book){
    return res.status(404).json({message:'Book not found'})
  }
  res.json(book);
});

router.post("/",async (req, res) => {
  const book = req.body;

  if (!book.title) {
    return res.status(400).json({ message: "Title is required!" });
  }

  if (!book.author) {
    return res.status(400).json({ message: "Author is required!" });
  }

  if (!book.pages) {
    return res.status(400).json({ message: "Pages is required!" });
  }

  //Manually adding recoreds to Database
//   const newBook = {
//     id: books[books.length - 1].id + 1,
//     title: book.title,
//     author: book.author,
//     pages: book.pages,
//   };

//   books.push(newBook);

// Using model

    const newBook =  new Book({
        title:book.title,
        author:book.author,
        pages:book.pages
    })
   const storeData =  await newBook.save()
    res.status(201).json(storeData);
  })



router.put("/:id",async (req, res) => {

  const id = req.params.id
  const{author}= req.body

  // const { title, author, pages } = req.body; manual operation
 const updatedBook = await Book.findByIdAndUpdate(
 id,{$set:{title:'You are so good'}},{new:true, runValidator:true}
 )
  const bookindex = books.findIndex((t) => t.id === id);

  // remove it. its for local operation
//   if (bookindex === -1) {
//     return res.status(404).json({ message: "Book not found" });
//   }

//   if (title) {
//     books[bookindex].title = title;
//   }

//   if (author) {
//     books[bookindex].author = author;
//   }

//   if (pages) {
//     books[bookindex].pages = pages;
//   }
  res.json(updatedBook);
});

router.delete("/:id", (req, res) => {
  const id = (req.params.id);
  const bookindex = books.findIndex((t) => t.id === id);

  // not relevant
  // if (bookindex === -1) {
  //   return res.send("Book not found");
  // }
  // books.splice(bookindex, 1);
  Book.deleteOne({_id:id})
  res.send({message:"Book deleted successfully"});
});
module.exports = router