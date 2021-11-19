const express = require('express');
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config');
// NOTE -- order matters here...needs to be towards top
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// NEW ===============================
require('dotenv').config();
require('./server/routes/users.routes')(app);
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// =======================================
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})