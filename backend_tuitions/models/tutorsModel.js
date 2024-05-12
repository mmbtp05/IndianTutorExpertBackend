const mongoose = require("mongoose")

const tutors = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city_name: {
        type: String,
        require: true
    },
    which_class: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    state: {
        type: Number,
        require: true
    },
    district: {
        type: Number,
        require: true
    },
    pincode: {
        type: String,
        require: true
    },
    phone_no: {
        type: Number,
        require: true,
        validate: {
            validator: function (v) {
                return /^[6-9]\d{9}$/.test(v);
            }
        }
    },
    email: {
        type: String,
        require: true,
        validate: {
            validator: function (v) {
                // Regular expression to validate email addresses
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            }
        }
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('tutors', tutors)