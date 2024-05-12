const mongoose = require('mongoose')

const connectDB = async (endPoint) => {
    return mongoose
        .connect(endPoint, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Database Connected !'))
        .catch((e) => { console.log(e) })

}

module.exports = connectDB