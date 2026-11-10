import React from 'react';

export default function KnowledgeBanner() {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-ec-navy-950 text-white text-center flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.28) 0%, transparent 65%), linear-gradient(rgba(5, 10, 24, 0.8), rgba(5, 10, 24, 0.92)), url('/View/Images/img-bg.webp')`
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-3">
          Tu conocimiento
        </h2>
        <p className="text-xl sm:text-3xl lg:text-4xl font-light text-white/90 tracking-tight m-0">
          es el camino al éxito
        </p>
      </div>
    </section>
  );
}

