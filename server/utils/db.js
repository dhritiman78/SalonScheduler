const mongoose = require('mongoose');

const URI = 'mongodb+srv://dhritimansaikia11b244:qn7XYGryOkYYiZv9@cluster0.c4doeee.mongodb.net/hair_cut_booking_system'

// Connect to the database
const connectDB = async () => {
    try {
        await  mongoose.connect(URI)
        console.log('Database connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    } 
}
 module.exports = connectDB