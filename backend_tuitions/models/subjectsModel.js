const mongoose = require("mongoose")

const Subjects = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('subjects', Subjects)