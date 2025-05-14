import mongoose from 'mongoose'

const subcategorySchema = mongoose.Schema({
    subcategory: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

export default mongoose.model('Subcategory', subcategorySchema)