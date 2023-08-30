import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return ( //NavBar CSS
    <nav class="navbar navbar-expand-md bg-info">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Rostering App</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-center d-flex" id="navbarNavAltMarkup">
      <div class="navbar-nav d-lg-flex justify-content-md-between">
        <Link class="nav-link active p-2 flex-grow-1" aria-current="page" to="/">
            Overview
        </Link>
        <Link class="nav-link" to="/employees">
            Employees
        </Link>
        <Link class="nav-link" to="/roster">
            Roster
        </Link>
      </div>
    </div>
  </div>
</nav>

  )
}

export default NavBar