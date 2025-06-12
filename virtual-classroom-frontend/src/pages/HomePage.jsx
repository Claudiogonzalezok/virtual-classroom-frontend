import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
//import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import NavbarHome from "../components/NavbarHome";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <NavbarHome />

      {/* Hero Section con carrusel */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-aos="zoom-in">
            <img
              src="https://www.revistaeconomia.com/wp-content/uploads/2022/06/Aula-Virtual.jpg"
              className="d-block w-100"
              alt="Aula virtual"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Bienvenido al Aula Virtual</h1>
              <p>Conectando conocimiento, personas y tecnología</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de características */}
      <section className="container mt-5">
        <h2 className="text-center mb-4" data-aos="fade-up">
          Características del Aula Virtual
        </h2>
        <div className="row text-center">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <i className="bi bi-laptop fs-1 text-primary"></i>
            <h4 className="mt-3">Acceso 24/7</h4>
            <p>Estudia cuando quieras, desde cualquier dispositivo.</p>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <i className="bi bi-chat-left-text fs-1 text-success"></i>
            <h4 className="mt-3">Comunicación Directa</h4>
            <p>Interactúa con profesores y compañeros al instante.</p>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <i className="bi bi-bar-chart-line fs-1 text-danger"></i>
            <h4 className="mt-3">Seguimiento de tu progreso</h4>
            <p>Mira tus avances y fortalece tus conocimientos.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white text-center p-5 mt-5" data-aos="fade-in">
        <h2>Comenzá tu camino al conocimiento</h2>
        <p className="lead">Registrate y empezá a aprender hoy mismo.</p>
        <a href="/register" className="btn btn-light mt-3">
          Registrarme
        </a>
      </section>

    </>
  );
};

export default HomePage;

