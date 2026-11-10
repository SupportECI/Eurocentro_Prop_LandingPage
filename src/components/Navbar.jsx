import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0a1128]/85 backdrop-blur-xl border-b border-white/10 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between" aria-label="Navegación principal">
          {/* Logo EuroCentro */}
          <a className="flex items-center" href="#formcontacto" aria-label="EuroCentro Inicio">
            <img
              src="/View/Images/Euro-centro-lg.png"
              alt="EuroCentro de Idiomas"
              className="h-11 w-auto object-contain drop-shadow transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Menú Desktop */}
          <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
            <li>
              <a href="#formcontacto" className="text-white/80 hover:text-white font-medium text-sm px-3 py-1.5 rounded-lg transition-all hover:bg-white/10">
                Inicio
              </a>
            </li>
            <li>
              <a href="#profesoresinter" className="text-white/80 hover:text-white font-medium text-sm px-3 py-1.5 rounded-lg transition-all hover:bg-white/10">
                Metodología
              </a>
            </li>
            <li>
              <a href="#nuestroscursos" className="text-white/80 hover:text-white font-medium text-sm px-3 py-1.5 rounded-lg transition-all hover:bg-white/10">
                Nuestros Cursos
              </a>
            </li>
            <li>
              <a href="#comments" className="text-white/80 hover:text-white font-medium text-sm px-3 py-1.5 rounded-lg transition-all hover:bg-white/10">
                Testimonios
              </a>
            </li>
            <li>
              <a
                href="#formcontacto"
                className="bg-ec-blue-primary hover:bg-ec-blue-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,113,227,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,113,227,0.45)] active:scale-95"
              >
                ¡Contáctanos!
              </a>
            </li>
          </ul>

          {/* Botón Hamburguesa Móvil */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ec-blue-primary cursor-pointer transition-colors"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Drawer Móvil con Backdrop Blur */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            onClick={closeMenu}
          />
          <aside className="fixed top-0 bottom-0 right-0 z-50 w-72 max-w-[80vw] bg-ec-navy-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-bold text-white text-base tracking-tight">EuroCentro</span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer border-0 transition-colors"
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                >
                  <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                <li>
                  <a className="block text-white/80 hover:text-white hover:bg-white/10 font-medium text-base px-4 py-2.5 rounded-xl transition-all" onClick={closeMenu} href="#formcontacto">
                    Inicio
                  </a>
                </li>
                <li>
                  <a className="block text-white/80 hover:text-white hover:bg-white/10 font-medium text-base px-4 py-2.5 rounded-xl transition-all" onClick={closeMenu} href="#profesoresinter">
                    Metodología
                  </a>
                </li>
                <li>
                  <a className="block text-white/80 hover:text-white hover:bg-white/10 font-medium text-base px-4 py-2.5 rounded-xl transition-all" onClick={closeMenu} href="#nuestroscursos">
                    Nuestros Cursos
                  </a>
                </li>
                <li>
                  <a className="block text-white/80 hover:text-white hover:bg-white/10 font-medium text-base px-4 py-2.5 rounded-xl transition-all" onClick={closeMenu} href="#comments">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a className="block text-center mt-3 bg-ec-blue-primary text-white font-semibold text-sm px-4 py-3 rounded-full shadow-md" onClick={closeMenu} href="#formcontacto">
                    ¡Contáctanos!
                  </a>
                </li>
              </ul>
            </div>
            <img className="h-10 w-auto object-contain mx-auto opacity-75" src="/View/Images/Euro-centro-lg.png" alt="EuroCentro" />
          </aside>
        </>
      )}
    </>
  );
}

