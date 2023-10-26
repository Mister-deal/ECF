import { Link } from "react-router-dom"


const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}><i className="bi bi-globe"></i> eTODO</Link>
          </div>
        </nav>
    )
}

export default Navbar