const express = require('express');

const pData = require('../helpers/projectModel.js');

const router = express.Router();


router.get('/', (req, res) => {
    pData.get()
         .then(projects => {
             res.status(200).json(projects);
         })
         .catch(error => {
             res.status(500).json({error: "Error retrieving project"})
         })
});

router.get('/:id', (req, res) => {
    const id =req.params.id;
    pData.get(id)
         .then(project => {
             if(project){
                 res.status(200).json(project);
             } else {
                 res.status(404).json({error: "The specified ID does not exist"})
             }
         })
         .catch(error => {
             res.status(500).json({error: "Error retrieving project"})
         })
});

module.exports = router;