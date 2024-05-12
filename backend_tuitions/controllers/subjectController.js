const expressAsyncHandler = require("express-async-handler")
const subjects = require("../models/subjectsModel")
const classes = require("../models/classesModel")
const customError = require("../utils/customeError")


const addNewSubject = expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const addedNewSubject = await subjects.create({
            name: name
        })
        return res.status(200).json({ addedNewSubject })
    } catch (error) {
        console.log(error)
    }
})

const addNewClass = expressAsyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const addedNewClass = await classes.create({
            name: name,
            subjects: []
        })
        return res.status(200).json({ addedNewClass })
    } catch (error) {
        console.log(error)
    }
})

const addSubjectInClass = expressAsyncHandler(async (req, res) => {
    try {
        const { classId, subjectId } = req.params
        const findClass = await classes.findById(classId)
        if (!findClass) {
            return res.status(400).json(customError("Class not found"))
        }
        const findSubject = await subjects.findById(subjectId)
        if (!findSubject) {
            return res.status(400).json(customError("Subject not found"))
        }
        const addSubject = await classes.findByIdAndUpdate(
            { _id: classId },
            { $push: { subjects: { _id: findSubject.id, name: findSubject.name } } },
            { new: true }
        )
        return res.status(200).json({ addSubject })
    } catch (error) {
        console.log(error)
    }
})

const showClasses = expressAsyncHandler(async (req, res) => {
    try {
        const allClasses = await classes.find()
        return res.status(200).json({ allClasses })
    } catch (error) {
        console.log(error)
    }
})


module.exports = {
    addNewSubject,
    addNewClass,
    addSubjectInClass,
    showClasses
}