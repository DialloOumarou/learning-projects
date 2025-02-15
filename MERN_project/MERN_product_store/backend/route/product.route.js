import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProduct, getProducts, updatProduct,deleteProduct} from '../controllers/product.controller.js';
const router = express.Router();


router.get('/',getProducts);

router.post('/',createProduct);

router.put('/:id',updatProduct);

router.delete('/:id',deleteProduct);


export default router;