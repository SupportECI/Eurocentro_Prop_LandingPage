import React from 'react';

const GALLERY_IMAGES = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/fondo-1.webp',
    alt: 'Estudiantes en aula EuroCentro'
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/img-3.webp',
    alt: 'Clase interactiva en grupo'
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/img-bg.webp',
    alt: 'Sala de conversación internacional'
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/fondo-hero-retina.webp',
    alt: 'Profesores certificados'
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/ingles.webp',
    alt: 'Biblioteca y estudio'
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/frances.webp',
    alt: 'Tecnología en el aprendizaje'
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/italiano.webp',
    alt: 'Ambiente multicultural'
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    fallback: '/View/Images/aleman.webp',
    alt: 'Comunidad de alumnos'
  }
];

export default function GalleryCarousel2() {
  const items = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section className="apple-gallery-strip" id="galeria" aria-label="Galería fotográfica EuroCentro">
      <div className="gallery-marquee-viewport">
        <div className="gallery-marquee-track">
          {items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="gallery-photo-card">
              <img
                src={item.src}
                alt={item.alt}
                className="gallery-photo-img"
                onError={(e) => { e.currentTarget.src = item.fallback; }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
