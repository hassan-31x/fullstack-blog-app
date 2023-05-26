import express from 'express'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import * as dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'

// Initialise App
const app = express()
app.use(express.json())
app.use(cookieParser())

// Initialise Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    } 
}) 
const upload = multer({ storage: storage }) // or ({storage}) cz they are of same name
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(process.env.PORT || 3001, () => {
    console.log(`connected on port ${process.env.PORT}`)
})