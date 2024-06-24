const userModel = require('../models/user-models')
const methods = require('./methods')
const login = async (req, res) => {
    try {
        let { email, password } = req.body
        const existingUser = (await userModel.countDocuments({ email: email }) > 0) ? await userModel.findOne({ email: email }) : ""
        if (existingUser == "") {
            return res.status(400).json({mess: 'user does not exist'})
        }
        if (!methods.comparePasswords(password,existingUser.password)) {
            return res.status(400).json({mess: 'wrong password'})
        }
        res.status(200).json({mess: 'Successfull', Token: await existingUser.generateToken()});
    } catch (error) {
        res.status(404).send('Internal server error')
    }
}

const registration = async (req, res) => {
    try {
        let { firstname, lastname, phone, email, password, cpassword } = req.body;
        const fullname = methods.capitalize(firstname) + " " + methods.capitalize(lastname)
        // Checking if any field is empty
        if (!firstname || !phone || !email || !password || !cpassword) {
            return res.status(400).json({mess: 'all not filled'});
        }

        // Checking if the email is already registered
        const emailExist = await userModel.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({mess: 'email exist'});
        }

        // Checking if passwords match
        if (password !== cpassword) {
            return res.status(400).json({mess: 'password mismatch'});
        }

        // Inserting into the database
        const user = new userModel({ name: fullname, phone: phone, email: email, password: methods.hashPassword(password) });
        await user.save();
        res.status(201).json({mess: 'Successfull', Token: await user.generateToken()});
    } catch (error) {
        res.status(404).send('Internal server error')
    }
}

module.exports = { login, registration }