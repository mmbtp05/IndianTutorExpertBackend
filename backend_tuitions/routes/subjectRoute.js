const router = require('express').Router()
const { addNewClass, addNewSubject, addSubjectInClass } = require('../controllers/subjectController')
// const isAuthenticate = require('../middlewares/auth')


router.route('/addclass').post(addNewClass)
router.route('/addsubject').post(addNewSubject)
router.route('/class/:classId/subject/:subjectId').post(addSubjectInClass)


module.exports = router