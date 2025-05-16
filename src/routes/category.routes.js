import { Router } from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js'

const router = Router()

router.get('/category', getCategories)
router.post('/category', createCategory)
router.put('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

export default router