import express from 'express'
import { getProducts,getProductsById } from '../controllers/productControllers.js';
import { Route } from 'react-router-dom';
const router=express.Router()
router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)



export default router;