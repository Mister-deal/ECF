import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Modal from './components/shared/Modal'
import AddProjectForm from './components/project/AddProjectForm'
import EditProjectForm from './components/project/EditProjectForm'
import NavBar from './components/shared/Navbar'
import ProjectDisplay from './components/project/ProjectDisplay'
import './App.css'
import { fetchProjects, setFormMode } from './components/project/projectSlice'


function App() {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.projects)
  const formMode = useSelector(state => state.projects.formMode)

  useEffect(() => {
    dispatch(fetchProjects())
    console.log(projects);
  }, [])

  return (
    <>
      {formMode === "add" && <Modal onClose={() => dispatch(setFormMode(""))}><AddProjectForm/></Modal>}
      {formMode === "edit" && <Modal onClose={() => dispatch(setFormMode(""))}><EditProjectForm/></Modal>}
      {/* {formMode === "delete" && <Modal onClose={() => dispatch(setFormMode(""))}><DeleteAlbumForm/></Modal>} */}
      {/* {formMode === "details" && <Modal onClose={() => dispatch(setFormMode(""))}><DetailsProjectForm/></Modal>} */}
      <header>
        <NavBar />
      </header>
      <main className='container'>
        <div className='row my-3'>
          <div className='col bg-dark rounded text-light p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3>Album List</h3>
              <button className='btn btn-success' onClick={() => dispatch(setFormMode("add"))}>Add</button>
            </div>
            <hr />
            {
              projects.length === 0 ? (
                <p>Il n'y a pas d'albums présents</p>
              ) : projects.map(project => <ProjectDisplay key={project.id} projects={project} />)
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
