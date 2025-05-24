import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, getProductsBySubcategory, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../middlewares/updateFile.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/products', isAuth, getProducts)
router.get('/products/search', getProducts)
router.get('/products/:id', getProduct)
router.get('/products/categories/:subcategory', getProductsBySubcategory)
router.post('/products', isAuth, upload, createProduct)
router.delete('/products/:id', isAuth, deleteProduct)
router.put('/products/:id', isAuth, upload, updateProduct)

export default router