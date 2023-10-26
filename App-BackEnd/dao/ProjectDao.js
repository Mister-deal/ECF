import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export default class ProjectDao {
    constructor(){
        this.file = resolve("./data/db.json")
        console.log(this.file);
        this.projects = [];
    }

    readfile() {
        const file = readFileSync(this.file, {encoding: "utf-8"});
        this.projects =JSON.parse(file);
    }

    writeFile(){
        writeFileSync(this.file, JSON.stringify(this.projects));
    }

    getAll() {
        return this.projects;
    }

    save(project) {
        this.projects.push(project)
        this.writeFile();
        return project;
    }

    findById(id) {
        return this.projects.find((p) => p.id == id);
    }

    deleteProject(id){
        this.projects = this.projects.filter((p) => p.id != id);
        this.writeFile();
    }

    updateProject(projectUpdate){
        const project = this.findById(projectUpdate.id);
        console.log(projectUpdate);
        if(project == undefined){
            return false;
        }
        project.title = projectUpdate.title;
        project.description = projectUpdate.description;
        project.state = projectUpdate.state;

        this.writeFile();
        return true;
    }

    updateState(id) {
        const project = this.findById(id);
        if(project == undefined){
            return false;
        }
        project.state = !project.statut;
        this.writeFile();

        return true;
    }

    searchByState(state){
        return this.projects.filter(project => project.state == state);
    }
}