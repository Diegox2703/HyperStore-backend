import multer from 'multer'
import fs from 'fs'
import path, { extname } from 'path'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir
        if (req.path.includes('/products')) {
            dir = path.join(process.cwd(), 'src', 'uploads', 'products')
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuid()}-${extname(file.originalname)}`
        cb (null, uniqueName)
    }
})

export const upload = multer({ storage }).single('image')