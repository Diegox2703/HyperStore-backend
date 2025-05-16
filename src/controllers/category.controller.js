import mongoose from 'mongoose';
import Category from '../models/category.model.js'
import Subcategory from '../models/subcategory.model.js'

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'subcategories', 
                    localField: '_id',
                    foreignField: 'category',
                    as: 'subcategories'
                }
            }
        ]);

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
    const { subcategories } = req.body
        
    try {
        const categoryToCreate = new Category({ category: req.body.category })
        const category = await categoryToCreate.save()
        const subcategoriesToCreate = subcategories.map(sub => {
            return {
                subcategory: sub.subcategory,
                category: category._id
            }
        })

        const newSubcategories = await Subcategory.insertMany(subcategoriesToCreate)

        const newCategory = {
            _id: category._id,
            category: category.category,
            subcategories: newSubcategories
        }

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
        const updatedCategoryName = await Category.findByIdAndUpdate(id, { category: category.category }, { new: true })

        const validToDelete = category.toDelete.filter(item => mongoose.Types.ObjectId.isValid(item))

        if (validToDelete.length !== 0) {
            await Subcategory.deleteMany({ _id: { $in: validToDelete } })
        }

        const toUpdate = category.subcategories.filter(sub => mongoose.Types.ObjectId.isValid(sub._id))
                                               .map(sub => ({
                                                 updateOne: {
                                                    filter: { _id: sub._id },
                                                    update: { $set: { subcategory: sub.subcategory } }
                                                 }
                                               }))

        const toAdd = category.subcategories.filter(sub => !mongoose.Types.ObjectId.isValid(sub._id))
                                            .map(sub => ({ subcategory: sub.subcategory, category: id }))
        
        await Subcategory.bulkWrite(toUpdate)

        if (toAdd.length !== 0) {
            await Subcategory.insertMany(toAdd)
        }

        const updatedSubCategories = await Subcategory.find({ category: id })

        const updatedCategory = {
            _id: updatedCategoryName._id,
            category: updatedCategoryName.category,
            subcategories: updatedSubCategories
        }

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

        await Subcategory.deleteMany({ category: id })

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