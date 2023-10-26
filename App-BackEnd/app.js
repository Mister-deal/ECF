import express from "express";
import  projects  from "./routes/projects.js";
import ProjectDao  from "./dao/ProjectDao.js";

const app = express();
const projectDao = new ProjectDao();
app.use(express.json());
app.use("/projects", projects);

app.listen(3000, () => {
    console.log("run at http://127.0.0.1:3000");
    projectDao.readfile();
})