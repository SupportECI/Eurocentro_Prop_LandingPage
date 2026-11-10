import React from 'react';

export default function LanguageBanner() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-ec-navy-950 text-white text-center flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.25) 0%, transparent 65%), linear-gradient(rgba(5, 10, 24, 0.82), rgba(5, 10, 24, 0.94)), url('/View/Images/img-3.webp')`
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/90 tracking-tight mb-2">
          Nosotros te ayudamos a
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
          hablar otro idioma
        </h2>
        <div className="inline-block max-w-2xl mx-auto px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
          <p className="text-base sm:text-lg text-white/95 leading-relaxed m-0 font-medium">
            Conoce nuestro método de enseñanza. <br className="hidden sm:inline" /> Agenda una clase muestra GRATIS
          </p>
        </div>
      </div>
    </section>
  );
}

