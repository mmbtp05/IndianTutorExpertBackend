const router = require('express').Router();
const { signupTutor, loginTutor } = require('../controllers/tutorController');

router.route('/signup').post(signupTutor)
router.route('/login').post(loginTutor)

module.exports = router;