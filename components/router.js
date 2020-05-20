const express = require('express');

// import db helpers

const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

// end db helpers

const router = express.Router();

// ALL API ENDPOINTS //

//      Projects        //

router.get("/projects", (req, res) => {
    projects.get()
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: `There was an error getting all project data ${error}`});
        });
});

router.post("/projects", (req, res) => {
    // needs name and description
    if (req.body.name && req.body.description){
        let newProject = {name: req.body.name, description: req.body.description}
        projects.insert(newProject)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(error => {
                res.status(500).json({errorMessage: `There was an internal error with the server ${error}`});
            })
    } else {
        res.status(400).json({error: "Please be sure to provide a name and description for the new project"});
    }
});

router.patch("/projects/:id", (req, res) => {
    const id = req.params;
    const changes = req.body;
    console.log(id.id);
    projects.update(id.id, changes)
        .then(data => {
            if(data != null){
                res.status(201).json(data);
            } else {
                res.status(404).json({errorMessage: "Could not find any project with that ID"});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an error with the request ${error}`});
        })
});

router.delete("/projects/:id", (req, res) => {
    const id = req.params.id;
    projects.remove(id)
        .then(data => {
            if (data >= 1){
                res.status(200).json(data);
            } else {
                res.status(404).json({errorMessage: "Could not find a record of a project with that id"});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an error with that request ${error}`});
        })
});

// get specific project actions
router.get("/projects/:id/actions", (req, res) => {
    const id = req.params.id;
    projects.getProjectActions(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an internal server error: ${error}`})
        })
})


//      Actions         //
router.get("/actions", (req, res) => {
    actions.get()
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({error: `There was an error getting all project data ${error}`});
        });
});

router.post("/actions/", (req, res) => {
    // needs project_id, description, notes
    if (req.body.project_id && req.body.description && req.body.notes){
        actions.insert(req.body)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(error => {
                res.status(500).json({errorMessage: `There was an internal server error ${error}`});
            })
    } else {
        res.status(400).json({errorMessage: {error: "Please be sure there is a project_id, description, and notes in your request"}});
    }
});

router.patch("/actions/:id", (req, res) => {
    const id = req.params;
    const changes = req.body;
    console.log(id.id);
    actions.update(id.id, changes)
        .then(data => {
            if(data != null){
                res.status(201).json(data);
            } else {
                res.status(404).json({errorMessage: "Could not find any project with that ID"});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an error with the request ${error}`});
        })
});

router.delete("/actions/:id", (req, res) => {
    const id = req.params.id;
    actions.remove(id)
        .then(data => {
            if (data >= 1){
                res.status(200).json(data);
            } else {
                res.status(404).json({errorMessage: "Could not find a record of an action with that id"});
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: `There was an error with that request ${error}`});
        })
});



// ROUTER EXPORT

module.exports = router;