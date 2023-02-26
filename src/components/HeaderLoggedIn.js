import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HeaderLoggedIn(props) {
  function handleLoggedOut() {
    props.setLoggedIn(false)
    localStorage.removeItem("sportoApptoken")
    localStorage.removeItem("sportoAppusername")
    localStorage.removeItem("sportoAppuserid")
  }

  return (
    <>
      <div className="flex-row my-3 my-md-0">
        <a href="#" className="text-white mr-2 header-search-icon">
          <input onChange={e => props.handleSearch(e.target.value)} type="text" />

          <span> </span>
          <i className="fas fa-search"></i>
        </a>

        <a href="#" className="mr-2">
          <img className="small-header-avatar" src="https://gravatar.com/avatar" />
        </a>
        <Link to="/create-event" className="btn btn-sm btn-success mr-2" href="/create-post">
          Create Event
        </Link>
        <button onClick={handleLoggedOut} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </>
  )
}

export default HeaderLoggedIn
