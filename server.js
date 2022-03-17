const express = require('express');
const cluster = require('cluster')
const os = require('os')
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config');

const cpus = os.cpus().length
console.log({ cpus })
// Initialize the server and ensure proper order 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
require('./server/routes/users.routes')(app);
// Parsing the cookies for authentication with user tokens and JWT
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Below distributes the application into a cluster
if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork() // creates a new worker process
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    // else its a worker process
    app.listen(8000, () => {
        console.log(`${process.pid} is listening at Port 8000`)
    })
}


// app.listen(8000, () => {
//     console.log("Listening at Port 8000")
// })