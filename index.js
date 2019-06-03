const express = require('express');
const port = 1314;

const server = express();

server.use(express.json());


server.listen(port, () => console.log('\n** Server Running on http://localhost:1314 **\n'))