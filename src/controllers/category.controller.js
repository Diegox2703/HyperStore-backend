import Category from '../models/category.model.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        if (categories.length === 0) return res.status(404).json({
            message: 'No se encontraron categorias'
        })

        res.status(200).json({
            message: 'Categorias encontradas',
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al obtener categoria'
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        const newCategory = await category.save()

        res.status(201).json({
            message: 'Categoria creada con exito',
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al crear categoria'
        })
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params
    const category = req.body

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true })

        if (!updateCategory) return res.status(404).json({
            message: 'Categoria a actualizar no encontrada'
        })

        res.status(200).json({
            message: 'Categoria actualizada',
            updatedCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al actualizar categoria'
        })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) return res.status(404).json({
            message: 'Categoria a eliminar no encontrada'
        })

        res.status(200).json({
            message: 'Categoria eliminada'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al eliminar categoria'
        })
    }
}