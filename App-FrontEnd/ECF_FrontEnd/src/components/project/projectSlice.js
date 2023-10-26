
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const db_url = "http://127.0.0.1:3000/projects"

export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async () => {
        const response = await fetch(db_url)
        const data = await response.json()
        const projects = []
        for (const key in data){
            projects.push({id:key, ...data[key]})
        }
        return projects
    }
)
export const fetchProject = createAsyncThunk(
    "projects/fetchProjects",
    async (id) => {
        const response = await fetch(`${db_url}/${id}`)
        if(!response.ok){
            throw new Error("smth went wrong during the PATCH project request")
        }
        const data = await response.json()
        return data
    }
)
export const postProject = createAsyncThunk(
    "projects/postProject",
    async (newProject) => {
        const response = await fetch(db_url, {
            method: "POST",
            headers: {
                "Content-Type": "db.json"
            },
            body: JSON.stringify(newProject)
        })
        const data = await response.json()
       
        return{
            id: data.title,
            ...newProject
        }
    }
)
export const editProject = createAsyncThunk(
    "projects/editProject",
    async (editProject) => {
        const response = await fetch(`${db_url}/${fetchProject.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "db.json"
            },
            body: JSON.stringify(editProject)
        })

        if(!response.ok){
            throw new Error("smth went wrong during the PATCH project request")
        }
        const data = await response.json()
        console.log(data);       
        return editProject
    }
)

export const deleteProject = createAsyncThunk(
    "projects/deleteProject",
    async (deleteProject) => {
        const response = await fetch(`${db_url}/projects/${deleteProject.id}`, {
            method: "DELETE"
        })
        const data = response.json()
        console.log(data);
        return deleteProject
    }
)

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        formMode: "",
        projects: [],
        selectedProject: null
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload
        },
        setFormMode: (state, action) => {
            state.formMode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload
            console.log(state.projects);
        })
        builder.addCase(postProject.fulfilled, (state, action) => {
            state.projects.push(action.payload)
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            let foundProject = state.projects.find(project => project.id === action.payload.id)
            if(foundProject) {
                state.projects = state.projects.filter(p => p.id !== action.payload.id)
            }
        })
    }
})

export default projectSlice.reducer
export const { setSelectedProject, setFormMode } = projectSlice.actions
