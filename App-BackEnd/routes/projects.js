import express from 'express'
import ProjectDao from '../dao/ProjectDao.js'
import { Project } from '../models/Project.js'

const projectDao = new ProjectDao();
const projects = express.Router();
projects.use(express.json());

//récupération de tous les projets
projects.get("/", (req, res) => {
    res.send(projectDao.getAll());
});

//récupération d'un seul projet avec l'aide de son Id
projects.get("/:id", (req, res) => {
    
    if(projectDao.findById(req.params.id)){
        res.send(projectDao.findById(req.params.id));
        console.log(req.params.id);
    }
    res.sendStatus(404).send("aucun projet n'a été trouvé");
});

//publication d'un projet
projects.post("/", (req, res) => {
    const {id, title, description, state } = req.body;

    let project = new Project(null, title, description, state);
    res.send(projectDao.save(project));
    console.log(project);
});

//modification d'un projet en cherchant l'id
projects.put('/:id', (req, res) => {
    const { id, title, description, state } = req.body;
    if(req.params.id != id) res.sendStatus(409);

    let project = new Project(null, title, description, state);
    project.id = id;
    projectDao.updateProject(project) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "problème durant la mise à jour du projet"})
});

//suppression d'un projet en cherchant l'id
projects.delete('/:id', (req, res) => {
    projectDao.deleteProject(req.params.id);
    res.sendStatus(200)
});

//chercher par état d'un projet
projects.get('/search/:search', (req, res) => {
    res.json(projectDao.searchByState(req.params.search));
});


export default projects