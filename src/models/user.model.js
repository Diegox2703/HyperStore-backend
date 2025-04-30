import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 90,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

export default mongoose.model('User', userSchema)