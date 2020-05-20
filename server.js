const express = require('express');

const router = require('./components/router')

const server = express();

server.use(express.json());

server.use('/api', router);

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
})
