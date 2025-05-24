import { Router } from 'express'
import { login, logOut, register } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logOut)    

export default router