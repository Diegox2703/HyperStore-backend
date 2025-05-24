import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const JWT_SECRET = process.env.JWT_SECRET

export const isAuth = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({
        message: 'No tienes acceso a esta ruta'
    })

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) return res.status(401).json({
            message: 'Token invalido'
        })

        req.user = decoded

        next()
    })
}