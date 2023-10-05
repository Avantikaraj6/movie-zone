import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Link to="/"><h1>Movie-Zone</h1></Link>
        </div>
        <div >
          <ul className="list-items">
            <Link to="/movie"><li >Movie</li></Link>
            <Link to="/series"><li>Series</li></Link>
            <Link to="/trending"><li>Trending</li></Link>
          </ul>
        </div>
    </div>
  )
}

export default Navbar;