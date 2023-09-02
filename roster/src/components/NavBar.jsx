import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return ( //NavBar CSS
  
    <nav className="container-fluid navbar navbar-expand-md bg-primary row justify-items-center gx-0 gy-0 sticky-top">
  <div className="container-fluid justify-content-md-center gap-5">

    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}

    {/* <div className="navbar justify-content-center d-flex row" id="navbarNavAltMarkup"> */}
    <Link className="col btn btn-outline-info d-lg-flex justify-content-lg-center col border-end border-info" to="/">
      <div className="nav-link text-center text-dark btn btn-outline-info">
            Roster
      </div>
    </Link>
      
    <Link className="col btn btn-outline-info d-lg-flex justify-content-center text-dark col border-end border-info" to="/employees">
      <div className="nav-link text-center">
        Employees
      </div>
    </Link>
        
      
    {/* </div> */}
  </div>
</nav>

  )
}

export default NavBar