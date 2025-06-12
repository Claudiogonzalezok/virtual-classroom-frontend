import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Aula Virtual
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
          </ul>

          {/* Botones de login y registro */}
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-light">
              Registro
            </Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarHome;
