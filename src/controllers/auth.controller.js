import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const SALT = 10
const JWT_SECRET = process.env.JWT_SECRET

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user) return res.status(401).json({
            message: 'Credenciales invalidas'
        })

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) return res.status(401).json({
            message: 'Credenciales invalidas'
        })

        user.password = undefined

        const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({
            message: 'Usuario logeado',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al logear usuario'
        })
    }
}

export const register = async (req, res) => {
    try {
        const user = new User(req.body)
        user.password = await bcrypt.hash(user.password, SALT)

        const newUser = await user.save()

        newUser.password = undefined

        const token = jwt.sign(newUser.toJSON(), JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({
            message: 'Usuario registrado',
            token,
            newUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al registrar usuario'
        })
    }
}