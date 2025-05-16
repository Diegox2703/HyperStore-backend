import Product from '../models/product.model.js'
import Subcategory from '../models/subcategory.model.js'
import fs from 'fs'
import { join } from 'path'

export const getProducts = async (req, res) => {

    try {
        const searchProduct = new RegExp(req.query.product, 'i')

        const products = await Product.find({
            product_name: searchProduct
        }).select({__v: 0})
          .populate('category')
          .populate('subcategory')
          .limit(req.query.limit)

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
        const product = await Product.findById(id)
                                     .select({__v: 0})
                                     .populate('category')
                                     .populate('subcategory')

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

export const getProductsBySubcategory = async (req, res) => {
    const { subcategory } = req.params

    try {
        const subCategoryFound = await Subcategory.findOne({ subcategory })
                                                  .populate('category')

        if (!subCategoryFound) return res.status(404).json({
            message: 'No se encontro la subcategoria',
        })

        const products = await Product.find({ subcategory: subCategoryFound._id })
                                      .limit(req.query.limit)

        res.status(200).json({
            category: subCategoryFound.category.category,
            subcategory: subCategoryFound.subcategory,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener productos'
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        product.image = req.file?.filename
        
        const savedProduct = await product.save()

        const newProduct = await Product.findOne({ _id: savedProduct._id })
                                        .populate('category')
                                        .populate('subcategory')

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
    const { image } = req.body

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) return res.status(404).json({
            message: 'No se encontro producto a eliminar'
        })

        const imageToDelete = join(process.cwd(), 'src', 'uploads', 'products', image)
        fs.unlink(imageToDelete, (err) => {
            if (err) throw err
            console.log('Imagen eliminada')
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
    console.log(data)
    
    if (req.file){
        const imageToDelete = join(process.cwd(), 'src', 'uploads', 'products', data.last_image)
        if (fs.existsSync(imageToDelete)) {
            fs.unlink(imageToDelete, (err) => {
                if (err) throw err
                console.log('imagen duplicada eliminada')
            })
        }
    }

    data.image = req.file ? req.file.filename : data.image
 
    try {
        const productIsUpdated = await Product.findByIdAndUpdate(id, data, { new: true })

        if (!productIsUpdated) return res.status(404).json({
            message: 'No se encontro producto a actualizar'
        })

        const updatedProduct = await Product.findOne({ _id: productIsUpdated._id })
                                            .populate('category')
                                            .populate('subcategory')

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