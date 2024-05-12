const expressAsyncHandler = require('express-async-handler');
const states = require("../models/statesModel");
const districts = require("../models/districtsModel")
// const customError = require('../utils/customeError');


const showStates = expressAsyncHandler(async (req, res) => {
    try {
        const allstates = await states.find().sort({ name: 1 })
        return res.status(200).json({ allstates })
    } catch (error) {
        console.log(error)
    }
})


const showDistricts = expressAsyncHandler(async (req, res) => {
    try {
        const { stateId } = req.params
        const alldistricts = await districts.find({ stateId: stateId }).sort({ name: 1 })
        return res.status(200).json({ alldistricts })
    } catch (error) {
        console.log(error)
    }
})



module.exports = {
    showStates,
    showDistricts
}