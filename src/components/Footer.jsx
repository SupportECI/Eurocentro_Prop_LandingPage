import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-ec-navy-950 border-t border-white/10 py-16 px-4 sm:px-6 text-white/85" id="foot">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
          {/* Columna 1: Logo */}
          <div className="flex justify-center md:justify-start items-center">
            <img
              src="/View/Images/Euro-centro-lg.png"
              alt="EuroCentro"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Columna 2: Ubicación con Alto Contraste */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
              Ubícanos en
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed m-0 font-normal">
              Av. 2a Sur Poniente #1417 Col. La Lomita 29060 (Frente al Parque Bicentenario), Tuxtla Gutiérrez, Chiapas 29060
            </p>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
              ¡Nuestras redes sociales!
            </h3>
            <ul className="flex justify-center md:justify-start items-center gap-4 list-none p-0 m-0">
              <li>
                <a
                  href="https://www.facebook.com/eurocentromx"
                  aria-label="Facebook EuroCentro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-ec-blue-primary hover:border-ec-blue-primary hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.87 2.853 7.063 6.578 7.828v-5.53h-1.978v-2.297h1.978v-1.74c0-1.958 1.192-3.036 2.96-3.036.844 0 1.566.063 1.777.09v2.063h-1.219c-.957 0-1.145.457-1.145 1.125v1.5h2.297l-.375 2.297h-1.922v5.531C13.148 15.063 16 11.87 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/eurocentromx/"
                  aria-label="Instagram EuroCentro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-ec-blue-primary hover:border-ec-blue-primary hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@eurocentromx"
                  aria-label="Tiktok EuroCentro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center transition-all hover:bg-ec-blue-primary hover:border-ec-blue-primary hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16">
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Derechos de Autor */}
        <hr className="border-white/10 my-10" />
        <div className="text-center">
          <p className="text-xs text-slate-400 m-0 font-normal">
            Euro Centro de Idiomas de México S.C. © todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}

