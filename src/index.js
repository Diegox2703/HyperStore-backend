import app from './app.js'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config()
 
const URI = process.env.MONGODB_URI
const PORT = 3000

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Connection to DB successful')
    } catch (error) {
        console.log(error)
    }
}

connectDB() 

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})