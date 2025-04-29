import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select({__v: 0})

        if (products.length === 0) return res.status(404).json({
            message: 'No hay productos'
        })

        res.status(200).json({
            message: 'Productos encontrados',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener productos'
        })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id).select({__v: 0})

        if (!product) return res.status(404).json({
            message: 'No se encontro el producto'
        })

        res.status(200).json({
            message: 'Producto encontrado',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener producto'
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        const newProduct = await product.save()

        res.status(201).json({
            message: 'Producto creado',
            newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener producto'
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) return res.status(404).json({
            message: 'No se encontro producto a eliminar'
        })

        res.status(200).json({
            message: 'Producto eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al eliminar producto'
        })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const data = req.body
 
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

        if (!updatedProduct) return res.status(404).json({
            message: 'No se encontro producto a actualizar'
        })

        res.status(200).json({
            message: 'Producto actualizado',
            updatedProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al actualizar producto'
        })
    }
}