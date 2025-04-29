import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        minLength: 30,
        maxLength: 1000,
        required: true
    },
    category: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    stock: {
        type: Number,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Product', productSchema)