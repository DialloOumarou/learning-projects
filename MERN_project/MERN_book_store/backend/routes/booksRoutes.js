import express from 'express';
import mongoose from 'mongoose';
import { Book } from "../models/bookModel.js";



const router = express.Router();




//create a new book
router.post('/', async (req,res)=>{
    try {

        if(!req.body.title || !req.body.author || !req.body.publishYear){

            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }

        const newBook ={
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        } 

        const book = await  Book.create(newBook);
        res.status(201).send(book);



    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message}); 
    }
});

//get all books
router.get('/', async (req,res)=>{
    try {
        
        const books = await Book.find({});
        res.status(200).json({
            count:books.length,
            data:books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//get books by id
router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

//update book
router.put('/:id', async (req,res)=>{

    try {
        
        if(!req.body.title || !req.body.author || !req.body.publishYear){

            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({message:'book not found'});
        }
        
        const result = await Book.findByIdAndUpdate(id,req.body);

        return res.status(200).send({message:'book updated sucessfully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
    
}); 


//delete book
router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({message:'book not found'});
        }
        
        const result = await Book.findByIdAndDelete(id);

        return res.status(200).send({message:'book deleted sucessfully'});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});        
    }    
});


export default router;