import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editProject, setFormMode } from "./projectSlice"


const EditProjectForm = () => {

    const dispatch = useDispatch()
    const selectedProject = useSelector(state => state.projects.selectedProject)

    const titleRef = useRef()
    const descriptionRef = useRef()
    const stateRef = useRef()

    useEffect(() => {
        if(selectedProject){
            titleRef.current.value = selectedProject.title
            descriptionRef.current.value = selectedProject.description
            stateRef.current.value = selectedProject.state
        }
    })

    const submitFormHandler = async (e) =>{
        e.preventDefault()

        const newProject = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            state: stateRef.current.value
        }
        dispatch(editProject(newProject))
        console.table(newProject);
        dispatch(setFormMode(""))
    }

    return(
        <>
        <h1>Edit project</h1>
            <hr />
            <form onSubmit={submitFormHandler}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" required ref={titleRef} placeholder="ranger la maison..."/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description:</label>
                    <input type="description" className="form-control" ref={descriptionRef}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">statut:</label>
                    <input type="text" className="form-control"  ref={stateRef} placeholder="à faire/terminé..."/>
                </div>
                <div className="text-end">
                    <button className="btn btn-success">Add</button>
                </div>
            </form>
        </>
    )
}
export default EditProjectForm
