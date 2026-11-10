import React from 'react';

export default function CtaBanner() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-[#050a18] via-[#0a1128] to-[#101c3d] text-white text-center overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,113,227,0.3)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8">
          ¡COMENCEMOS!
        </h2>
        <a
          href="#formcontacto"
          className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full bg-ec-blue-primary hover:bg-ec-blue-hover text-white shadow-[0_10px_30px_rgba(0,113,227,0.45)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_40px_rgba(0,113,227,0.55)] active:scale-95 cursor-pointer"
        >
          Iniciar Conversación
        </a>
      </div>
    </section>
  );
}

