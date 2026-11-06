import React, { useState, useRef, useEffect } from 'react';

const SIMPLE_VIDEOS = [
  {
    id: 'v1',
    name: 'Carlos Mendoza',
    language: 'Inglés',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/t2.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'v2',
    name: 'Sofía Valenzuela',
    language: 'Francés',
    poster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/t1.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'v3',
    name: 'Diego Ramos',
    language: 'Italiano',
    poster: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/t3.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'v4',
    name: 'Andrea Morales',
    language: 'Inglés B2',
    poster: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/fondo-1.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'v5',
    name: 'Marco Toledo',
    language: 'Alemán',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/aleman.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'v6',
    name: 'Valentina Cruz',
    language: 'Francés B1',
    poster: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    fallbackPoster: '/View/Images/frances.webp',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
  }
];

export default function VideoCarousel2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const containerRef = useRef(null);
  const dragStartRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastPosRef = useRef(0);
  const velocityRef = useRef(0);

  // Responsive: 3 simultáneos en desktop, 2 en tablet, 1 en móvil
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalVideos = SIMPLE_VIDEOS.length;
  const maxIndex = Math.max(0, totalVideos - slidesToShow);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    lastPosRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - dragStartRef.current;
    setDragOffset(diff);

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      velocityRef.current = (currentX - lastPosRef.current) / dt;
      lastPosRef.current = currentX;
      lastTimeRef.current = now;
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    const threshold = 50;
    const velocity = velocityRef.current;

    if (dragOffset < -threshold || velocity < -0.35) {
      nextSlide();
    } else if (dragOffset > threshold || velocity > 0.35) {
      prevSlide();
    }

    setDragOffset(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  return (
    <section className="apple-user-video-carousel" id="video-testimonios" aria-label="Videos testimoniales">
      <div className="container">
        {/* Cabecera y Controles Apple con espaciado compacto */}
        <div className="video-carousel-header">
          <div className="video-carousel-controls">
            <button
              type="button"
              className="apple-nav-arrow-btn"
              onClick={prevSlide}
              aria-label="Ver videos anteriores"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="apple-carousel-counter">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              type="button"
              className="apple-nav-arrow-btn"
              onClick={nextSlide}
              aria-label="Ver siguientes videos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport Interactivo: 3 tarjetas simultáneas */}
        <div
          ref={containerRef}
          className={`apple-carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="apple-carousel-track"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 20px) / ${slidesToShow} + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {SIMPLE_VIDEOS.map((item) => (
              <div
                key={item.id}
                className="apple-video-slide"
                style={{
                  flex: `0 0 calc((100% - ${(slidesToShow - 1) * 20}px) / ${slidesToShow})`,
                  width: `calc((100% - ${(slidesToShow - 1) * 20}px) / ${slidesToShow})`
                }}
              >
                <div
                  className="apple-clean-video-card"
                  onClick={() => setSelectedVideo(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver video de ${item.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedVideo(item); }}
                >
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="apple-video-poster-img"
                    onError={(e) => { e.currentTarget.src = item.fallbackPoster; }}
                    loading="lazy"
                  />
                  <div className="apple-video-poster-scrim"></div>

                  {/* Botón Apple Play Central */}
                  <div className="apple-play-circle" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </div>

                  {/* Etiqueta mínima de identificación (sin descripción) */}
                  <div className="apple-video-min-badge">
                    <span>{item.name}</span>
                    <span className="badge-dot">•</span>
                    <span>{item.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Paginación Dots */}
        <div className="apple-carousel-dots" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`apple-carousel-dot ${currentIndex === dotIdx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Ir al grupo ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal Apple para reproducir el video al hacer clic */}
      {selectedVideo && (
        <div
          className="video-modal-backdrop"
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Reproductor de video de ${selectedVideo.name}`}
        >
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div className="d-flex align-items-center gap-2">
                <span className="video-modal-title">{selectedVideo.name}</span>
                <span className="badge-dot">•</span>
                <small className="video-modal-subtitle">{selectedVideo.language}</small>
              </div>
              <button
                type="button"
                className="video-modal-close-btn"
                onClick={() => setSelectedVideo(null)}
                aria-label="Cerrar video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="video-modal-player-wrap">
              <video
                src={selectedVideo.videoUrl}
                poster={selectedVideo.poster}
                controls
                autoPlay
                playsInline
                className="video-modal-player"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
