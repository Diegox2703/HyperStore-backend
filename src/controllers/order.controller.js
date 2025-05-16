import Order from '../models/order.model.js'

export const getOrders = async (req, res) => {
    const id = req.user._id
    const user = req.user.role === 'admin' ? {} : { user: id }

    try {
        const orders = await Order.find(user)
                                  .sort({ createdAt: -1 })
                                  .populate('user', 'username email')
                                  .populate('products.product', 'product_name image description')

        if (orders.length === 0) return res.status(404).json({
            message: 'No se encontraron las ordenes'
        })

        res.status(200).json({
            message: 'Ordenes encontradas',
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al crear orden'
        })
    }
}

export const createOrder = async (req, res) => {
    const data = req.body

    try {
        const order = new Order(data)
        const newOrder = await order.save()

        res.status(201).json({
            message: 'Orden creada',
            newOrder
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al crear orden'
        })
    }
}