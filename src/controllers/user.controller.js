import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const SALT = 10

export const getUsers = async (req, res) => {
    try {
        const searchName = new RegExp(req.query.username, 'i')

        const users = await User.find({
            username: searchName
        }).select({ __v: 0, password: 0 })

        if (users.length === 0) return res.status(404).json({
            message: 'No hay usuarios'
        })

        res.status(200).json({
            message: 'Usuarios encontrados',
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener usuarios'
        })
    }
}

export const createUser = async (req, res) => {
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

        res.status(201).json({
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

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) return res.status(404).json({
            message: 'No se encontro el usuario a eliminar'
        })

        res.status(200).json({
            message: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al borrar usuario'
        })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

        if (!updatedUser) return res.status(404).json({
            message: 'No se encontro el usuario a actualizar'
        })

        updatedUser.password = undefined
        updatedUser.__v = undefined

        res.status(200).json({
            message: 'Usuario actualizado',
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al actualizar usuario'
        })
    }
}