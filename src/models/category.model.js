import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        minLenght: 3,
        maxLenght: 30,
        unique: true,
        required: true
    },
    subcategories: [{
        subcategory: {
            type: String,
            minLenght: 3,
            maxLenght: 30,
            unique: true,
            required: true
        },
    }]
})

export default mongoose.model('Category', categorySchema)