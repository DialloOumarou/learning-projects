import express from "express";
import  {PORT,MONGODBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();


app.use(express.json());

//middleware for handling cors policy
// app.use(cors(
//     {
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     }
// ));

app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world !!!');
});

app.use('/books',booksRoutes);

mongoose.connect(MONGODBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`app lstening on port : ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})