import React from 'react';

const METHODOLOGY_ITEMS = [
  {
    id: 'profesores',
    title: 'Profesores internacionales',
    description: 'Estudiarás con profesores certificados en la enseñanza del idioma de cualquier parte del mundo, para que aprendas distintas pronunciaciones y seas un experto.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    )
  },
  {
    id: 'plataformas',
    title: 'Plataformas innovadoras',
    description: 'Complemento para tu aprendizaje, acceso a prácticas extras y oportunidades de educación personalizada a través de nuestra plataforma.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'clases',
    title: 'Clases en vivo',
    description: 'Tú eliges la forma de aprender un idioma: a) Presencial en nuestras instalaciones b) A distancia en cualquier parte del mundo a través de nuestra plataforma.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'salas',
    title: 'Salas de conversación',
    description: 'Sesiones grupales en vivo con personas de todo el mundo para poner en práctica tu pronunciación y fluidez conversacional.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  }
];

export default function Methodology() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-ec-canvas text-center" id="profesoresinter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ec-text-main tracking-tight leading-tight max-w-4xl mx-auto mb-14">
          La mejor manera de aprender un idioma presencial o en línea
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {METHODOLOGY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-black/8 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-ec-blue-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-ec-blue-light text-ec-blue-primary flex items-center justify-center mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-ec-text-main mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-ec-text-muted leading-relaxed m-0">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

