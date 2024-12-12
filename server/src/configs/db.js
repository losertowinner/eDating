const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connecting database...${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting database...${error}`)
        process.exit(1)
    }
}

module.exports = connectDB