import express from 'express'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'src', 'uploads', 'products')))
app.use(cors())

app.use('/api', productRoutes)
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
    
export default app