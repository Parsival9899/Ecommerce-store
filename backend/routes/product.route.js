import express from 'express';
const router = express.Router(); 

import {createproduct, deleteproduct, getproducts,updateproduct} from '../controller/product.controller.js';

router.get('/', getproducts);

router.put('/:id', updateproduct);

router.delete('/:id',deleteproduct );

router.post('/', createproduct);



export default router;