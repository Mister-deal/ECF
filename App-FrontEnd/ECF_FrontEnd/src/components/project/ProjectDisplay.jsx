import { useDispatch } from "react-redux"
import { setFormMode, setSelectedProject } from "./projectSlice"



const ProjectDisplay = (props) => {
    const project = props.projects
    const dispatch = useDispatch()

    const editProjectHandler = () => {
        dispatch(setSelectedProject(project))
        dispatch(setFormMode("edit"))
    }
    const deleteProjectHandler = () => {
        dispatch(setSelectedProject(project))
        dispatch(setFormMode("delete"))
    }

    return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h2>{project.title}</h2>
        </div>
        <div className="card-footer">
        <p>
            <b>statut:</b> {project.description}
          </p>
          <p>
            <b>statut:</b> {project.state}
          </p>
          <hr />
            <>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                    dispatch(setFormMode("edit"))
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  dispatch(setFormMode("delete"))
                }}
              >
                Delete
              </button>
            </>
        </div>
      </div>
    </>
  );
}
export default ProjectDisplay