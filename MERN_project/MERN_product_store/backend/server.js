import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import Product from './models/product.model.js';
import Products from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from "./route/product.route.js"

dotenv.config();

const app = express();

app.use(express.json());//allows us to accept json data in the body of the request

app.use("/api/products",productRoutes);


const PORT = process.env.PORT || 5000;







app.listen(PORT, () => {
    connectDb();
    console.log('Server is running on port: '+PORT);
});


