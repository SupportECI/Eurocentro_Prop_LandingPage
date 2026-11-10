import React from 'react';

const COURSES = [
  {
    id: 'ingles',
    title: 'Inglés',
    description: 'Saber este idioma te coloca entre los profesionistas más demandados por las empresas que compiten en el mercado internacional. Con nosotros desarrollarás las cuatro habilidades lingüísticas: Leer, escribir, hablar y escuchar.',
    image: '/View/Images/ingles.webp',
    flag: '/View/Images/ingles_m.webp',
    alt: 'Curso de Inglés'
  },
  {
    id: 'frances',
    title: 'Francés',
    description: 'El dominio de este idioma facilita las posibilidades de obtener becas para estudiar en las mejores universidades francoparlantes.',
    image: '/View/Images/frances.webp',
    flag: '/View/Images/frances_m.webp',
    alt: 'Curso de Francés'
  },
  {
    id: 'italiano',
    title: 'Italiano',
    description: 'Si eres amante de la cocina, la moda o el diseño, este idioma es ideal para ti, además es un idioma fácil de aprender, ya que, su raíz es latina al igual que la lengua española.',
    image: '/View/Images/italiano.webp',
    flag: '/View/Images/italiano_m.webp',
    alt: 'Curso de Italiano'
  }
];

export default function Courses() {
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

  return (
    <section className="pt-24 pb-24 px-4 sm:px-6 bg-ec-canvas-alt" id="nuestroscursos">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ec-text-main tracking-tight m-0">
          Nuestros Cursos
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-black/8 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-ec-blue-primary/30 transition-all duration-300 flex flex-col group text-left"
          >
            {/* Contenedor de Imagen con Bandera */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 mb-6">
              <img
                src={course.image}
                alt={course.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <img
                src={course.flag}
                alt={`Bandera ${course.title}`}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full border-2 border-white shadow-md object-cover bg-white"
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-grow">
              <a
                href="#formcontacto"
                onClick={() => handleSelectCourse(course.title)}
                className="inline-block"
              >
                <h3 className="text-2xl font-bold text-ec-text-main mb-3 tracking-tight group-hover:text-ec-blue-primary transition-colors">
                  {course.title}
                </h3>
              </a>
              <p className="text-sm text-ec-text-muted leading-relaxed m-0">
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

