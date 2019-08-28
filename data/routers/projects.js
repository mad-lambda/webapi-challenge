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

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    pData.getProjectActions(id)
         .then(projectActions => {
             if(projectActions){
                 res.status(200).json(projectActions);
             } else {
                 res.status(404).json({error: "The specified ID does not exist"})
             }
         })
         .catch(error => {
             res.status(500).json({error: "Error retrieving project"})
         })
});

router.post('/', (req, res) => {
    const data = req.body;
    if(data.name && data.description){
        pData.insert(data)
             .then(newProject => {
                 res.status(201).json(newProject)
             })
             .catch(error => {
                 res.status(500).json({error: "Error creating new Project"})
             })
    } else {
        res.status(400).json({error: "Please provide name and description in the body"})
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    pData.remove(id)
         .then(count => {
             if(count > 0){
                 res.status(200).json({message: "Project deleted successfully!"})
             }
         })
         .catch(error => {
             res.status(500).json({error: "There was a problem deleting this project"})
         })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if(updateData.name && updateData.description){
        pData.update(id, updateData)
             .then(updated => {
                 res.status(200).json({updated})
             })
             .catch(error => {
                 "There was an error updating this project."
             })
    }
});

module.exports = router;