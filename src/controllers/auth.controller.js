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

        res.status(200)
           .cookie('token', token, {
                httpOnly: true,  
                secure: true,
                sameSite: 'None',
                path: '/'
            })
           .json({
                message: 'Usuario logeado',
                user
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al logear usuario'
        })
    }
}

export const logOut = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/'
    }) 
       .json({
            message: 'Sesion cerrada'
       })
}
  
export const register = async (req, res) => {
    const { email } = req.body
   
    try {
        const emailExist = await User.findOne({ email })

        if (emailExist) return res.status(400).json({
            message: 'Email ya existe'
        })

        const user = new User(req.body)
        user.password = await bcrypt.hash(user.password, SALT)

        const newUser = await user.save()

        newUser.password = undefined

        const token = jwt.sign(newUser.toJSON(), JWT_SECRET, { expiresIn: '1d' })

        res.status(201)
            .cookie('token', token, {
                  httpOnly: true,  
                  secure: true,
                  sameSite: 'None',
                  path: '/'
            })
            .json({
                message: 'Usuario registrado',
                newUser
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al registrar usuario'
        })
    }
}