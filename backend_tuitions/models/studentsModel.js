const mongoose = require("mongoose")

const Student = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    city_name: {
        type: String,
        requier: true
    },
    which_class: {
        type: Boolean,
        require: true,
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
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            }
        }
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})



module.exports = mongoose.model('students', Student)