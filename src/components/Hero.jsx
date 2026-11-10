import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function Hero() {
  const formRef = useRef(null);
  const phoneInputRef = useRef(null);
  const ladaInputRef = useRef(null);
  const itiRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicialización de la librería de ladas internacionales intl-tel-input
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

  const sanitizeInput = (input) => {
    const element = document.createElement("div");
    element.innerText = input;
    return element.innerHTML;
  };

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
    <section className="relative min-h-[calc(100vh-74px)] bg-ec-navy-950 flex items-center justify-center py-14 px-4 sm:px-6 overflow-hidden" id="formcontacto">
      {/* Fondo con imagen retina y degradado de iluminación ambiental */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 35%, rgba(0, 113, 227, 0.28) 0%, transparent 55%), linear-gradient(to bottom, rgba(5, 10, 24, 0.85), rgba(5, 10, 24, 0.94)), url('/View/Images/fondo-hero-retina.webp')`
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        {/* Columna Izquierda: Mensaje Editorial y Propuesta de Valor */}
        <div className="w-full lg:w-[53%] text-center lg:text-left text-white">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white/90 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse"></span>
            <span>EuroCentro de Idiomas • Convocatoria de Becas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] mb-5 text-white">
            La mejor manera de aprender un idioma presencial o en línea
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Estudia con profesores certificados, plataformas innovadoras y clases en vivo diseñadas para que alcances fluidez desde tu primera lección.
          </p>

          <div className="flex flex-col gap-3.5 items-center lg:items-start">
            <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Profesores internacionales certificados</span>
            </div>
            <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Clases en vivo presenciales y a distancia</span>
            </div>
            <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>Salas de conversación grupales en vivo</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Formulario Apple Glass */}
        <div className="w-full lg:w-[47%] flex justify-center lg:justify-end">
          <div className="w-full max-w-[490px] bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-8 text-left">
            <form ref={formRef} onSubmit={handleSubmit} id="phone-form" name="contact-form" noValidate>
              <div className="text-center mb-6">
                <span className="inline-block bg-[#ffcc00] text-[#0a1128] text-base sm:text-lg font-extrabold px-5 py-2 rounded-full shadow-[0_4px_16px_rgba(255,204,0,0.45)] mb-2.5 tracking-tight">
                  ¡Aplica para nuestras BECAS!
                </span>
                <p className="text-slate-500 text-sm leading-relaxed m-0">
                  Llena este breve formulario para obtener nuestra promoción vigente.
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="validationCustom01" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Nombre(s) y Apellidos
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 shadow-sm transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none"
                  id="validationCustom01"
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Ingresa un Número de Teléfono
                </label>
                <input
                  ref={phoneInputRef}
                  id="phone"
                  type="tel"
                  name="numeroTelefonico"
                  className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 shadow-sm transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none"
                  required
                  minLength="13"
                  maxLength="16"
                />
                <input ref={ladaInputRef} id="lada" name="lada" type="hidden" />
              </div>

              <div className="mb-4">
                <label htmlFor="validationCustomUsername" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="correoElectronico"
                  className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 shadow-sm transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none"
                  id="validationCustomUsername"
                  placeholder="ejemplo@dominio.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="validationCustom04" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  ¿Qué idioma deseas Aprender?
                </label>
                <select
                  className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 pr-10 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d1d1f%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[size:16px] bg-no-repeat transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none cursor-pointer"
                  name="idiomaSeleccionado"
                  id="validationCustom04"
                  defaultValue=""
                  required
                >
                  <option disabled value="">Seleccione...</option>
                  <option>Inglés</option>
                  <option>Francés</option>
                  <option>Italiano</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="validationCustomConocimiento" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  ¿Tienes conocimientos previos?
                </label>
                <select
                  className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 pr-10 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231d1d1f%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[size:16px] bg-no-repeat transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none cursor-pointer"
                  name="conocimiento"
                  id="validationCustomConocimiento"
                  defaultValue=""
                  required
                >
                  <option disabled value="">Seleccione...</option>
                  <option>Si, tengo conocimientos previos</option>
                  <option>No, tengo conocimientos previos</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  ¿Dónde vives?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="ciudadOrigen"
                    className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 shadow-sm transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none"
                    id="validationCustomCiudad"
                    placeholder="Ciudad"
                    required
                  />
                  <input
                    type="text"
                    name="estadoOrigen"
                    className="w-full h-12 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 px-3.5 shadow-sm transition-all focus:border-ec-blue-primary focus:ring-4 focus:ring-ec-blue-primary/20 focus:outline-none"
                    id="validationCustomEstado"
                    placeholder="Estado"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 mb-1">
                <button
                  className="w-full min-h-[50px] inline-flex items-center justify-center rounded-full bg-ec-blue-primary hover:bg-ec-blue-hover text-white font-semibold text-base shadow-[0_6px_18px_rgba(0,113,227,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,113,227,0.45)] active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed border-0 cursor-pointer"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando su información..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

