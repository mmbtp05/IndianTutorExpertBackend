const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const connectDB = require('./db/connect');
const cors = require('cors');
const tutorRoute = require('./routes/tutorRoute');
const locationRoute = require("./routes/locationRoute");
const studentRoute = require("./routes/studentRoute");
const subjectRoute = require("./routes/subjectRoute");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tutor', tutorRoute);
app.use('/api/location', locationRoute);
app.use('/api/student', studentRoute);
app.use('/api/subject', subjectRoute);

app.get('/', async (req, res) => {
    res.send("helloooo");
})

// app.get('/assets/:filename', async (req, res) => {
//     const filePath = `./assets/${req.params.filename}`;
//     res.sendFile(filePath, { root: __dirname });
// });

const start = async () => {
    try {
        await connectDB(process.env.DB_ENDPOINT)
        app.listen(port, console.log(`Server is running on http//127.0.0.1:${port}`))

    } catch (e) {
        console.log(e)
    }
}

start();