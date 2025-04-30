import express from 'express'
import productRoutes from './routes/product.routes.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(express.json())

app.use('/api', productRoutes)
app.use('/api',authRoutes)
app.use('/api', userRoutes)
    
export default app