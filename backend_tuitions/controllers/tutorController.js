const expressAsyncHandler = require('express-async-handler');
const tutors = require("../models/tutorsModel");
const customError = require('../utils/customeError');
const { checkPassword, hashPassword } = require('../utils/passUtil')
const jwt = require('jsonwebtoken')
// const fs = require('fs');
// const path = require('path');

const signupTutor = expressAsyncHandler(async (req, res) => {
    try {
        const { username, password, name, address, city_name, which_class, subject, state, district, pincode, phone_no, email } = req.body
        if (!username || !password || !name || !address || !city_name || !which_class || !subject || !state || !district || !pincode || !phone_no || !email) {
            return res.status(400).json(customError("All feilds are required"))
        }
        const checkUsername = await tutors.find({ username: username })
        if (checkUsername.length > 0) {
            return res.status(400).json(customError("Username already exists"))
        }
        const testPhone = /^[6-9]\d{9}$/
        if (!testPhone.test(phone_no)) {
            return res.status(400).json(customError("Enter a valid phone number"))
        }
        const testEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        if (!testEmail.test(email)) {
            return res.status(400).json(customError("Enter a valid email address"))
        }
        const pass = await hashPassword(password)
        const newTutor = await tutors.create({
            username: username,
            password: pass,
            name: name,
            address: address,
            city_name: city_name,
            which_class: which_class,
            subject: subject,
            state: state,
            district: district,
            pincode: pincode,
            phone_no: phone_no,
            email: email
        })
        delete newTutor["password"]
        res.status(200).send(newTutor)
    } catch (error) {
        console.log(error)
    }
})


const loginTutor = expressAsyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body
        if(!username){
            return res.status(400).json(customError('Please enter username.'))
        }
        if(!password){
            return res.status(400).json(customError('Please enter password.'))
        }
        const checkUser = await tutors.find({ username: username })
        if (checkUser.length === 0) {
            return res.status(400).json(customError('User not found.'))
        }
        if (! await checkPassword(password, checkUser[0].password)) {
            return res.status(400).json(customError('Password Incorrect.'))
        }
        delete checkUser[0]["password"]
        const token = jwt.sign({user: checkUser[0].username, id:checkUser[0]._id }, process.env.TOKEN_KEY, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: '1d',
        })
        return res.status(200).json({ token: token, checkUser });
    } catch (error) {
        console.log(error)
    }
})



module.exports = {
    signupTutor,
    loginTutor
}