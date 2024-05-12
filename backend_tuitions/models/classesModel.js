const mongoose = require("mongoose")

const Classes = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    subjects: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Class'
            },
            name: {
                type: String,
                require: true
            }
        }
    ]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('classes', Classes)