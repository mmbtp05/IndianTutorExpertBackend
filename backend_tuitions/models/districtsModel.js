const mongoose = require("mongoose")

const Districts = new mongoose.Schema({
    districtId: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    stateId: {
        type: Number,
        require: true,
        
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('districts', Districts)