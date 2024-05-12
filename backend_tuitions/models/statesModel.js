const mongoose = require("mongoose")

const States = new mongoose.Schema({
    stateId: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('states', States)