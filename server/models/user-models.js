const mongoose = require('mongoose');
const jwt= require("jsonwebtoken");
require('dotenv').config();
const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    cpassword: String,
    date: {
        type: Date,
        default: Date.now
    }
    });
    userSchema.methods.generateToken = async function () {
        try {
            return jwt.sign(
                {
                    userID: this._id.toString(),
                    email: this.email
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "30d",
                  }
            )
        } catch (error) {
            console.log(error)
        }
    }
    const User = mongoose.model('User', userSchema)
    module.exports = User