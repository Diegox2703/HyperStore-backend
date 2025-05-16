import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, getProductsBySubcategory, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../middlewares/updateFile.js'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.get('/products/categories/:subcategory', getProductsBySubcategory)
router.post('/products', upload, createProduct)
router.delete('/products/:id', deleteProduct)
router.put('/products/:id', upload, updateProduct)

export default router