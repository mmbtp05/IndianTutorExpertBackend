const students = require('../models/studentsModel')
const customError = require('../utils/customeError')
const expressAsyncHandler = require('express-async-handler');
const tutors = require('../models/tutorsModel');

const registerStudent = expressAsyncHandler(async (req, res) => {
    try {
        const { name, address, city_name, which_class, subject, state, district, pincode, phone_no, email } = req.body
        const testPhone = /^[6-9]\d{9}$/
        if (!testPhone.test(phone_no)) {
            return res.status(400).json(customError("Enter a valid phone number"))
        }
        const testEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        if (!testEmail.test(email)) {
            return res.status(400).json(customError("Enter a valid email address"))
        }
        const newStudent = await students.create({
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
        return res.status(200).json({ newStudent })
    } catch (error) {
        console.log(error)
    }
})

const getStudentForTeacher = expressAsyncHandler(async (req, res) => {
    try {
        const teacher_id = req.user_id
        const findTeacher = await tutors.findById(teacher_id)
        const districtId = findTeacher.district
        const findStudents = await students.find({ district: districtId })
        if (findStudents.length == 0) {
            return res.status(200).json(customError("No students found in your district"))
        }
        findStudents.splice(0, 5);
        return res.status(200).json({ findStudents })
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    registerStudent,
    getStudentForTeacher
}