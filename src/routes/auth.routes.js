import { Router } from 'express'
import { login, logOut, register } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', login)
router.post('/logout', logOut)    
router.post('/register', register)

export default router