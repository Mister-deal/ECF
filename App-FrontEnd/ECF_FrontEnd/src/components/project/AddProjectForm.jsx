import { useRef } from "react"
import { useDispatch } from "react-redux"
import { postProject, setFormMode } from "./projectSlice"


const AddProjectForm = () => {

    const dispatch = useDispatch()

    const titleRef = useRef()
    const descriptionRef = useRef()
    const stateRef = useRef()

    const submitFormHandler = async (e) =>{
        e.preventDefault()

        const newProject = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            state: stateRef.current.value
        }
        dispatch(postProject(newProject))
        console.table(newProject);
        dispatch(setFormMode(""))
    }

    return(
        <>
        <h1>Add project</h1>
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
export default AddProjectForm
