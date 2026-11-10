import React from 'react';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Mónica Macías',
    age: '13 años',
    avatar: '/View/Images/t1.webp',
    text: 'Me gusta Euro Centro por sus horarios, por su forma de enseñar y sus maestros. Los contenidos que enseñan son buenos. Empecé a estudiar aquí para tener mejores oportunidades en el futuro.'
  },
  {
    id: 't2',
    name: 'Vanessa Martínez',
    age: '24 años',
    avatar: '/View/Images/t2.webp',
    text: 'Entré a Euro Centro para tener mejores oportunidades laborales y tener la posibilidad de viajar y conocer nuevos lugares.'
  },
  {
    id: 't3',
    name: 'Karen Hernández',
    age: '24 años',
    avatar: '/View/Images/t3.webp',
    text: 'Me inscribí a Euro Centro porque me dieron la posibilidad de obtener buenos conocimientos y resultados sobre mi aprendizaje en Inglés. He aprendido mucho durante estos 3 meses.'
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-ec-canvas text-center" id="comments">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ec-text-main tracking-tight mb-10">
          Testimonios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-black/8 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-ec-blue-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Estrellas Doradas */}
                <div className="flex gap-1 text-[#f5a623] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  ))}
                </div>

                {/* Perfil */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.avatar}
                    className="w-14 h-14 rounded-full object-cover border-2 border-ec-blue-primary shadow-sm"
                    alt={item.name}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-ec-text-main m-0 tracking-tight">
                      {item.name}
                    </h3>
                    <span className="inline-block bg-ec-canvas-alt text-ec-text-muted text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1">
                      {item.age}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-ec-text-muted leading-relaxed m-0">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

