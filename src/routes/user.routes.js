import { Router } from 'express'
import { deleteUser, getUsers, updateUser } from '../controllers/user.controller.js'

const router = Router()

router.get('/users', getUsers)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)

export default router