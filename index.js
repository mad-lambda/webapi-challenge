const express = require('express');
const port = 1314;

const server = express();
const ProjectRoutes = require('./data/routers/projects.js')
const ActionRoutes = require('./data/routers/actions.js')

server.use(express.json());

server.use('/api/projects', ProjectRoutes);
server.use('/api/actions', ActionRoutes);

server.listen(port, () => console.log('\n** Server Running on http://localhost:1314 **\n'))