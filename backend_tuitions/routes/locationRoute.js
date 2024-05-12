const router = require('express').Router();
const { showDistricts, showStates } = require('../controllers/locationController');

router.route('/states').get(showStates)
router.route('/districts/:stateId').get(showDistricts)

module.exports = router;