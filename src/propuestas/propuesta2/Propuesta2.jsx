import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import './propuesta2.css';
import VideoCarousel2 from './VideoCarousel2.jsx';
import GalleryCarousel2 from './GalleryCarousel2.jsx';


/**
 * Propuesta 2 - EuroCentro Landing Page
 * Totalmente autocontenida en src/propuestas/propuesta2/
 * Para eliminar esta propuesta si es denegada, simplemente elimina esta carpeta
 * y en App.jsx renderiza la otra propuesta directamente.
 */
export default function Propuesta2() {
  const formRef = useRef(null);
  const phoneInputRef = useRef(null);
  const ladaInputRef = useRef(null);
  const itiRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicialización de la librería de ladas internacionales
  useEffect(() => {
    if (phoneInputRef.current && window.intlTelInput) {
      const iti = window.intlTelInput(phoneInputRef.current, {
        initialCountry: "mx",
        utilsScript: "/View/App/intlTelInputWithUtils.js"
      });
      itiRef.current = iti;

      const updatePhoneNumber = () => {
        if (!iti) return;
        const countryData = iti.getSelectedCountryData();
        if (countryData && countryData.dialCode) {
          const dialCode = countryData.dialCode;
          const currentVal = phoneInputRef.current.value.replace(/^\+?\d+/, "");
          phoneInputRef.current.value = `+${dialCode}${currentVal}`;
          if (ladaInputRef.current) {
            ladaInputRef.current.value = dialCode;
          }
        }
      };

      phoneInputRef.current.addEventListener("countrychange", updatePhoneNumber);
      updatePhoneNumber();

      return () => {
        if (iti && iti.destroy) {
          iti.destroy();
        }
      };
    }
  }, []);

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const closeOffcanvas = () => {
    const offcanvasEl = document.querySelector("#offcanvasNavbar");
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || new window.bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }
  };

  // Seleccionar automáticamente el idioma al hacer clic en la tarjeta del curso
  const handleSelectCourse = (courseName) => {
    const select = document.querySelector("#validationCustom04");
    if (select) {
      for (let option of select.options) {
        if (option.text.toLowerCase() === courseName.toLowerCase()) {
          select.value = option.value;
          break;
        }
      }
    }
  };

  // Función para sanitizar el input
  const sanitizeInput = (input) => {
    const element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML;
  };

  // Manejo del envío del formulario con Google Apps Script y SweetAlert2
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const campoTelefono = phoneInputRef.current;
    if (campoTelefono && campoTelefono.value.length < 13) {
      campoTelefono.setCustomValidity("número inválido");
    } else if (campoTelefono) {
      campoTelefono.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.add("was-validated");

    // Sanitizar campos
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.value = sanitizeInput(input.value);
    });

    setIsSubmitting(true);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwS0JYhK2xgdU_OnLWT57Oc342PgXVxN2AteKr6Es30zEnWttSEL7ey5588CkY7zN_i/exec";

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form)
      });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Gracias!",
        text: "Un asesor te contactará lo antes posible",
        showConfirmButton: false,
        timer: 2500
      });

      form.reset();
      form.classList.remove("was-validated");

      if (phoneInputRef.current) {
        phoneInputRef.current.value = "+52";
      }
    } catch (error) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error",
        text: "Favor de contactarnos por WhatsApp",
        showConfirmButton: false,
        timer: 2500
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="propuesta-2">
<div className="general">
        <header>
            <nav className="navbar banner" aria-label="Navegación principal">
              <div className="container-fluid">
                <a className="navbar-brand text-white" href="#formcontacto" aria-label="EuroCentro Inicio">
                  <img src="/View/Images/Euro-centro-lg.png" height="46" width="160" alt="EuroCentro de Idiomas" style={{ height: "46px", width: "auto" }} />
                </a>

                {/*  Menú Desktop Apple Style  */}
                <ul className="nav-menu-desktop">
                  <li><a href="#formcontacto">Inicio</a></li>
                  <li><a href="#profesoresinter">Metodología</a></li>
                  <li><a href="#nuestroscursos">Nuestros Cursos</a></li>
                  <li><a href="#comments">Testimonios</a></li>
                  <li><a href="#formcontacto" className="nav-cta-btn">¡Contáctanos!</a></li>
                </ul>

                {/*  Botón Toggle Menú Móvil  */}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Abrir menú de navegación">
                  <span className="navbar-toggler-icon"></span>
                </button>

                {/*  Sidebar Móvil Offcanvas  */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">EuroCentro de Idiomas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                      <li className="nav-item">
                        <a className="nav-link active nav-link-close text-white" onClick={closeOffcanvas} aria-current="page" href="#formcontacto">Inicio</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active nav-link-close text-white" onClick={closeOffcanvas} aria-current="page" href="#nuestroscursos">Nuestros Cursos</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active nav-link-close text-white" onClick={closeOffcanvas} aria-current="page" href="#comments">Testimonios</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active nav-link-close text-white" onClick={closeOffcanvas} aria-current="page" href="#formcontacto">¡Contáctanos!</a>
                      </li>
                    </ul>
                    <img className="img-sidebar" src="/View/Images/Euro-centro-lg.png" height="46" width="150" alt="EuroCentro" style={{ height: "46px", width: "auto" }} />
                  </div>
                </div>
              </div>
            </nav>
        </header>
        
        {/*  Inicio / Formulario Principal con Alineación Derecha  */}
        <section className="body" id="formcontacto">
            <div className="bg-img"></div>
            <div className="container-fluid">
                <div className="hero-row">
                    {/*  Columna Izquierda: Mensaje y Propuesta de Valor  */}
                    <div className="hero-left-content">
                        <div className="hero-badge-pill">
                            <span className="pulse-dot"></span>
                            <span>EuroCentro de Idiomas • Convocatoria de Becas</span>
                        </div>
                        <h1 className="hero-title">La mejor manera de aprender un idioma presencial o en línea</h1>
                        <p className="hero-subtitle">Estudia con profesores certificados, plataformas innovadoras y clases en vivo diseñadas para que alcances fluidez desde tu primera lección.</p>
                        <div className="hero-highlights">
                            <div className="hero-highlight-item">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span>Profesores internacionales certificados</span>
                            </div>
                            <div className="hero-highlight-item">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span>Clases en vivo presenciales y a distancia</span>
                            </div>
                            <div className="hero-highlight-item">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                <span>Salas de conversación grupales en vivo</span>
                            </div>
                        </div>
                    </div>

                    {/*  Columna Derecha: Formulario de Captación  */}
                    <div className="hero-form-content">
                        <div className="form-container">
                            <form ref={formRef} onSubmit={handleSubmit} className="needs-validation" id="phone-form" name="contact-form" noValidate>
                                <div className="form-titles">
                                    <h5 className="form-title">¡Aplica para nuestras BECAS!</h5>
                                    <p className="form-p">Llena este breve formulario para obtener nuestra promoción vigente.</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustom01" className="form-label euro">Nombre(s) y Apellidos</label>
                                    <input type="text" name="nombreCompleto" className="form-control" id="validationCustom01" placeholder="Ingresa tu nombre completo" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label tel-input euro">Ingresa un Número de Teléfono</label>
                                    <input ref={phoneInputRef} id="phone" type="tel" name="numeroTelefonico" className="form-control" required minLength="13" maxLength="16" />
                                    <input ref={ladaInputRef} id="lada" name="lada" type="hidden" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustomUsername" className="form-label euro">Correo Electrónico</label>
                                    <div className="input-group has-validation">
                                        <input type="email" name="correoElectronico" className="form-control" id="validationCustomUsername" placeholder="ejemplo@dominio.com" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustom04" className="form-label euro">¿Qué idioma deseas Aprender?</label>
                                    <select className="form-select" name="idiomaSeleccionado" id="validationCustom04" required>
                                        <option selected disabled value="">Seleccione...</option>
                                        <option>Inglés</option>
                                        <option>Francés</option>
                                        <option>Italiano</option>
                                        {/*  <option>Alemán</option>  */}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustomConocimiento" className="form-label euro">¿Tienes conocimientos previos?</label>
                                    <select className="form-select" name="conocimiento" id="validationCustomConocimiento" required>
                                        <option selected disabled value="">Seleccione...</option>
                                        <option>Si, tengo conocimientos previos</option>
                                        <option>No, tengo conocimientos previos</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label euro">¿Dónde vives?</label>
                                    <div className="row g-2">
                                        <div className="col-6">
                                            <input type="text" name="ciudadOrigen" className="form-control" id="validationCustomCiudad" placeholder="Ciudad" required />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" name="estadoOrigen" className="form-control" id="validationCustomEstado" placeholder="Estado" required />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 mb-2">
                                    <button className="btn-conv" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviando su información..." : "Enviar"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/*  Sección de Metodología  */}
        <section className="contenido">
            <div className="container-fluid text-center">
                <h4 className="center text-center">La mejor manera de aprender un idioma presencial o en línea</h4>
                <div className="list-curs">
                    <li className="wow fadeInLeft" data-wow-delay="0.1s" id="profesoresinter">
                        <div className="main_wr2">
                            <h5>Profesores internacionales</h5>
                            <p>Estudiarás con profesores certificados en la enseñanza del idioma de cualquier parte del mundo, para que aprendas distintas pronunciaciones y seas un experto.</p>
                        </div>
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="0.3s" id="plataformas">
                        <div className="main_wr2">
                            <h5>Plataformas innovadoras</h5>
                            <p>Complemento para tu aprendizaje, acceso a prácticas extras y oportunidades de educación personalizada a través de nuestra plataforma.</p>
                        </div>
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="0.2s" id="clasesenvivo">
                        <div className="main_wr2">
                            <h5>Clases en vivo</h5>
                            <p>Tú eliges la forma de aprender un idioma: <br /> a) Presencial en nuestras instalaciones <br /> b) A distancia en cualquier parte del mundo a través de nuestra plataforma</p>
                        </div>
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="0.4s" id="salas">
                        <div className="main_wr2">
                            <h5>Salas de conversación</h5>
                            <p>Sesiones grupales en vivo con personas de todo el mundo.</p>
                        </div>
                    </li>
                </div>
            </div>
        </section>
    
        {/*  Sección de imagen central  */}
        <section className="img-cent">
            <div className="cent-img text-center p-2">
                <div className="txt-c1">
                    <h1 className="display-4 display-md-1">Tu conocimiento</h1>
                    <h2 className="display-5 display-md-2">es el camino al éxito</h2>
                </div>
            </div> 
        </section>
          
        {/*  Sección de apartado de cursos */}
        <section className="cursos" id="nuestroscursos">
            <div className="container-fluid text-center">
                <div className="title">
                    <h1> Nuestros Cursos </h1>
                </div>
            </div>
        </section>

        {/*  Sección de apartado de cursos - imágenes  */}
        <section className="cursos-txt">
            <div className="container-fluid text-center">
                <div className="cursos-img">
                    <div className="container text-center">
                        <div className="row g-4 justify-content-center">
                            {/*  Tarjeta Inglés  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="img-text-container">
                                    <div className="img-container">
                                        <img src="/View/Images/ingles.webp" className="img-us" alt="Curso de Inglés" />
                                        <img src="/View/Images/ingles_m.webp" className="img-mini" alt="Bandera Inglés" />
                                    </div>
                                    <div className="img-text-content">
                                        <a href="#formcontacto" onClick={() => handleSelectCourse("Inglés")}><h2>Inglés</h2></a>
                                        <p>Saber este idioma te coloca entre los profesionistas más demandados por las empresas que compiten en el mercado internacional. Con nosotros desarrollarás las cuatro habilidades lingüísticas: Leer, escribir, hablar y escuchar.</p>
                                    </div>
                                </div>
                            </div>

                            {/*  Tarjeta Francés  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="img-text-container">
                                    <div className="img-container">
                                        <img src="/View/Images/frances.webp" className="img-us" alt="Curso de Francés" />
                                        <img src="/View/Images/frances_m.webp" className="img-mini" alt="Bandera Francés" />
                                    </div>
                                    <div className="img-text-content">
                                        <a href="#formcontacto" onClick={() => handleSelectCourse("Francés")}><h2>Francés</h2></a>
                                        <p>El dominio de este idioma facilita las posibilidades de obtener becas para estudiar en las mejores universidades francoparlantes.</p>
                                    </div>
                                </div>
                            </div>

                            {/*  Tarjeta Italiano  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="img-text-container">
                                    <div className="img-container">
                                        <img src="/View/Images/italiano.webp" className="img-us" alt="Curso de Italiano" />
                                        <img src="/View/Images/italiano_m.webp" className="img-mini" alt="Bandera Italiano" />
                                    </div>
                                    <div className="img-text-content">
                                        <a href="#formcontacto" onClick={() => handleSelectCourse("Italiano")}><h2>Italiano</h2></a>
                                        <p>Si eres amante de la cocina, la moda o el diseño, este idioma es ideal para ti, además es un idioma fácil de aprender, ya que, su raíz es latina al igual que la lengua española.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Imagen central abajo  */}
        <section className="img-end">
            <div className="end-img text-center p-2">
                <div className="txt-c2">
                    <h2 className="display-5 display-md-4">Nosotros te ayudamos a</h2>
                    <h1 className="display-4 display-md-3">hablar otro idioma</h1>
                    <p className="lead lead-md">Conoce nuestro método de enseñanza. <br /> Agenda una clase muestra GRATIS</p>
                </div>
            </div> 
        </section>
        
        {/* Galería Fotográfica Pura (Solo imágenes en carrusel infinito) */}
        <GalleryCarousel2 />

        {/*  Apartado de testimonios  */}
        <section className="testimonios" id="comments">
            <div className="container-fluid text-center">
                <div className="text-test">
                    <h1>Testimonios</h1>
                </div>   
                <div className="test">
                    <div className="container text-center">
                        <div className="row g-4 justify-content-center">
                            {/*  Testimonio 1  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="card1 d-flex flex-column w-100">
                                    <div className="card-stars">
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="/View/Images/t1.webp" className="rounded-circle me-3" alt="Mónica Macías" />
                                        <div>
                                            <h5 className="card-title text-start mb-0">Mónica Macías</h5>
                                            <p className="card-text text-start mb-0"><small className="text-body-secondary">13 años</small></p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Me gusta Euro Centro por su horarios, por su forma de enseñar y sus maestros. Los contenidos que enseñan son buenos. Empecé a estudiar aquí para tener mejores oportunidades en el futuro.</p>
                                    </div>
                                </div>
                            </div>
                            {/*  Testimonio 2  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="card2 d-flex flex-column w-100">
                                    <div className="card-stars">
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="/View/Images/t2.webp" className="rounded-circle me-3" alt="Vanessa Martínez" />
                                        <div>
                                            <h5 className="card-title text-start mb-0">Vanessa Martínez</h5>
                                            <p className="card-text text-start mb-0"><small className="text-body-secondary">24 años</small></p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Entré a Euro Centro para tener mejores oportunidades laborales y tener la posibilidad de viajar y conocer nuevos lugares.</p>
                                    </div>
                                </div>
                            </div>
                            {/*  Testimonio 3  */}
                            <div className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="card3 d-flex flex-column w-100">
                                    <div className="card-stars">
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="/View/Images/t3.webp" className="rounded-circle me-3" alt="Karen Hernández" />
                                        <div>
                                            <h5 className="card-title text-start mb-0">Karen Hernández</h5>
                                            <p className="card-text text-start mb-0"><small className="text-body-secondary">24 años</small></p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Me inscribí a Euro Centro porque me dieron la posibilidad de obtener buenos conocimientos y resultados sobre mi aprendizaje en Inglés. He aprendido mucho durante estos 3 meses.</p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </section> 

        
        {/* Carrusel de Videos Testimoniales (Controlado por el usuario) */}
        <VideoCarousel2 />

        {/*  Apartado final  */}
        <section className="sec-btn">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="txt-come"> ¡COMENCEMOS! </h1>
                        <a href="#formcontacto" className="btn-conv"> Iniciar Conversación </a>
                    </div>
                </div>
            </div>
        </section>
              
        {/*  Footer  */}
        <footer className="footer" id="foot">
            <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <img className="img-euro" src="/View/Images/Euro-centro-lg.png" height="52" width="160" alt="EuroCentro" style={{ height: "52px", width: "auto" }} />
                  </div>
                  <div className="col">
                    <h4> Ubícanos en</h4>
                    <p>Av. 2a Sur Poniente #1417 Col. La Lomita 29060 (Frente al Parque Bicentenario), Tuxtla Gutiérrez, Chiapas 29060</p>
                  </div>
                  <div className="col">
                    <h5 className="txt-red"> ¡Nuestras redes sociales! </h5>
                    <ul className="example-2">
                        <li className="icon-content">
                            <a href="https://www.facebook.com/eurocentromx" aria-label="Facebook" data-social="facebook" target="_blank" rel="noopener noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.87 2.853 7.063 6.578 7.828v-5.53h-1.978v-2.297h1.978v-1.74c0-1.958 1.192-3.036 2.96-3.036.844 0 1.566.063 1.777.09v2.063h-1.219c-.957 0-1.145.457-1.145 1.125v1.5h2.297l-.375 2.297h-1.922v5.531C13.148 15.063 16 11.87 16 8c0-4.42-3.58-8-8-8z"/>
                              </svg>
                            </a>
                        </li> 
                        <li className="icon-content">
                          <a href="https://www.instagram.com/eurocentromx/" aria-label="Instagram" data-social="instagram" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                            </svg>
                          </a>
                        </li>
                        <li className="icon-content">
                            <a href="https://www.tiktok.com/@eurocentromx" aria-label="Tiktok" data-social="tiktok" target="_blank" rel="noopener noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                              </svg>
                            </a>
                        </li>
                    </ul> 
                  </div>
                </div>

                {/*  Derechos ©  */}
                <hr />
                <div className="container-der">
                    <div className="row">
                        <h3 className="txt-dr">Euro Centro de Idiomas de México S.C. © todos los derechos reservados</h3>
                    </div>
                </div> 
            </div>
        </footer>   
    </div>

    {/*  Codigo de WhatsApp y Teléfono  */}
    <section aria-label="Acceso directo a contacto">
        <a href="https://api.whatsapp.com/send?phone=525535209725" className="float" target="_blank" rel="noopener noreferrer" title="Contacto Celular" aria-label="WhatsApp EuroCentro">
            <img src="/View/Images/whatsapp.png" width="32" height="32" alt="WhatsApp" />
        </a>
        <a href="tel:+52-55-3520-9725" className="float2" target="_blank" rel="noopener noreferrer" title="Contacto Telefónico" aria-label="Llamada EuroCentro">
            <img src="/View/Images/llamada.png" width="32" height="32" alt="Llamada" />
        </a>
    </section>

    
    </div>
  );
}
