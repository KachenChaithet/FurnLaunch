import express from 'express'
import { AddProduct, DeleteProduct, GetAllProduct, GetProductById, UpdateProduct } from '../controllers/ProductController.js'

const router = express.Router()

router.post('/add', AddProduct)
router.put('/update/:id', UpdateProduct)
router.get('/get', GetAllProduct)
router.delete('/delete/:id', DeleteProduct)
router.get('/search/:id', GetProductById)

export default router