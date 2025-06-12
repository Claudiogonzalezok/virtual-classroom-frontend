import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Información */}
          <div className="col-md-4 mb-4" data-aos="fade-up">
            <h5 className="fw-bold">Aula Virtual</h5>
            <p className="small">
              Plataforma educativa moderna diseñada para brindar acceso al conocimiento desde cualquier lugar.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <h6 className="fw-bold">Enlaces útiles</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-white text-decoration-none">Acerca de</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contacto</a></li>
              <li><a href="#" className="text-white text-decoration-none">Términos y condiciones</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <h6 className="fw-bold">Seguinos</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5">
              <a href="#" className="text-white"><FaFacebookF /></a>
              <a href="#" className="text-white"><FaTwitter /></a>
              <a href="#" className="text-white"><FaInstagram /></a>
              <a href="#" className="text-white"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <hr className="border-light my-3" />
        <p className="text-center small mb-0">&copy; {new Date().getFullYear()} Aula Virtual. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
