import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navbar = () => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" onClick={() => {window.location.href="/blog/"}} >Blog by Michał Janiuk</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" exact to='/'>Main</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default navbar;