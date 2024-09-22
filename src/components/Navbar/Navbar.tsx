import React from 'react';
import { MegaLink } from '../MegaLink/MegaLink';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <MegaLink className="navbar-brand" href="/">
          <i className="bi bi-bag-heart-fill mx-2"></i>
          OrderFlow
        </MegaLink>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <MegaLink className="nav-link" href="/orders">
                Orders
              </MegaLink>
            </li>
            <li className="nav-item">
              <MegaLink className="nav-link" href="/items">
                Items
              </MegaLink>
            </li>
            <li className="nav-item">
              <MegaLink className="nav-link" href="/clients">
                Clients
              </MegaLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
