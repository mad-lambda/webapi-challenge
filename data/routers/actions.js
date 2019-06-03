const express = require('express');

const aData = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    aData.get()
         .then(actions => {
             res.status(200).json(actions);
         })
         .catch(error => {
             res.status(500).json({error: "Error retrieving actions"})
         })
});

router.get('/:id', (req, res) => {
    const id =req.params.id;
    aData.get(id)
         .then(action => {
             if(action){
                 res.status(200).json(action);
             } else {
                 res.status(404).json({error: "The specified ID does not exist"})
             }
         })
         .catch(error => {
             res.status(500).json({error: "Error retrieving action"})
         })
});

router.post('/', (req, res) => {
    const data = req.body;
    if(data.project_id && data.description && data.notes){
        aData.insert(data)
             .then(newAction => {
                 res.status(201).json(newAction)
             })
             .catch(error => {
                 res.status(500).json({error: "Error creating new Action"})
             })
    } else {
        res.status(400).json({error: "Please provide project ID, notes and description in the body"})
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    aData.remove(id)
         .then(count => {
             if(count > 0){
                 res.status(200).json({message: "Action deleted successfully!"})
             }
         })
         .catch(error => {
             res.status(500).json({error: "There was a problem deleting this action"})
         })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if(updateData.project_id && updateData.description && updateData.notes){
        aData.update(id, updateData)
             .then(updated => {
                 res.status(200).json({updated})
             })
             .catch(error => {
                 "There was an error updating this action."
             })
    }
});


module.exports = router;