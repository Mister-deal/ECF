export class Project {
    static id = 1;
    constructor(id, title, description, state){
        this.id = Project.id++;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}