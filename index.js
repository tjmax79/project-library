const envFile = process.env.NODE_ENV ==='production' ? '.env.production':'env.development'
require('dotenv').config({path:envFile})


const express = require("express");
const app = express();
const helmet = require('helmet')
const booksRoutes= require('./routes/books')
const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/Project-library')
.then(()=>{
  console.log('mongoDB connected succesfully');
})
.catch((err)=>{
  console.log('mongoDB failed to connect',err);
})



app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extented:true}))

app.use('/api/books',booksRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at  port ${PORT}...`);
});
