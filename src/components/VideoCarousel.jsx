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

export default function VideoCarousel() {
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
    <section className="pt-4 pb-14 bg-ec-canvas relative" id="video-testimonios" aria-label="Videos testimoniales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Controles de Navegación Compactos */}
        <div className="flex justify-center items-center mb-5">
          <div className="inline-flex items-center gap-4 bg-white border border-black/10 rounded-full px-4 py-1.5 shadow-sm">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-ec-canvas-alt text-ec-navy-950 flex items-center justify-center cursor-pointer shadow-sm transition-all duration-200 hover:bg-ec-blue-primary hover:text-white hover:shadow-md active:scale-90 border-0"
              onClick={prevSlide}
              aria-label="Ver videos anteriores"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="text-xs sm:text-sm font-bold text-ec-text-muted min-w-[50px] text-center select-none tracking-wider">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-ec-canvas-alt text-ec-navy-950 flex items-center justify-center cursor-pointer shadow-sm transition-all duration-200 hover:bg-ec-blue-primary hover:text-white hover:shadow-md active:scale-90 border-0"
              onClick={nextSlide}
              aria-label="Ver siguientes videos"
            >
              <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Viewport Interactivo (Exactamente 3 simultáneos en desktop) */}
        <div
          ref={containerRef}
          className={`overflow-hidden w-full max-w-[1200px] mx-auto rounded-3xl select-none touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            className="flex w-full will-change-transform"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {SIMPLE_VIDEOS.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div
                  className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-xl border border-white/20 cursor-pointer group"
                  onClick={() => setSelectedVideo(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver video de ${item.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedVideo(item); }}
                >
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = item.fallbackPoster; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-[#050a18]/75 pointer-events-none"></div>

                  {/* Botón Apple Play Central */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-ec-blue-primary text-white flex items-center justify-center pl-1 shadow-[0_12px_30px_rgba(0,113,227,0.45)] ring-8 ring-ec-blue-primary/20 transition-all duration-200 group-hover:scale-110 group-hover:bg-ec-blue-hover group-hover:ring-[12px] group-hover:ring-ec-blue-primary/30 z-10" aria-hidden="true">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  </div>

                  {/* Etiqueta de identificación sin descripción */}
                  <div className="absolute bottom-3.5 left-4 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#050a18]/85 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 z-10">
                    <span>{item.name}</span>
                    <span className="text-ec-blue-primary font-black">•</span>
                    <span>{item.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Paginación Dots */}
        <div className="flex justify-center items-center gap-2 mt-6" aria-hidden="true">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`h-2 rounded-full border-0 cursor-pointer p-0 transition-all duration-300 ${
                currentIndex === dotIdx
                  ? 'w-7 bg-ec-blue-primary shadow-[0_2px_8px_rgba(0,113,227,0.4)]'
                  : 'w-2 bg-black/20 hover:bg-black/40'
              }`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Ir al grupo ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal Apple para reproducir el video */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Reproductor de video de ${selectedVideo.name}`}
        >
          <div
            className="bg-[#0a1128] border border-white/15 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-white">{selectedVideo.name}</span>
                <span className="text-ec-blue-primary font-black">•</span>
                <small className="text-white/70 text-xs sm:text-sm font-medium">{selectedVideo.language}</small>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border-0 cursor-pointer"
                onClick={() => setSelectedVideo(null)}
                aria-label="Cerrar video"
              >
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <video
                src={selectedVideo.videoUrl}
                poster={selectedVideo.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

