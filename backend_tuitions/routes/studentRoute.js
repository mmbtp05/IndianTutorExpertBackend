const router = require('express').Router()
const { registerStudent, getStudentForTeacher } = require('../controllers/studentController')
const isAuthenticate = require('../middlewares/auth')


router.route('/register').post(registerStudent)
router.route('/students').get(isAuthenticate, getStudentForTeacher)

module.exports = router