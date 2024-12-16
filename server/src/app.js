const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./configs/db');
const swaggerSpec = require('./configs/swagger');

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
    connectDB()
})