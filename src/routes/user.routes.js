import { Router } from 'express'
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/users', isAuth, getUsers)
router.post('/users', isAuth, createUser)
router.put('/users/:id', isAuth, updateUser)
router.delete('/users/:id', isAuth, deleteUser)

export default router