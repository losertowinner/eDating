const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.route');
const connectDB = require('./configs/db');

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
    connectDB()
})