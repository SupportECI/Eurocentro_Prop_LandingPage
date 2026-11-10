import React from 'react';

export default function FloatingContact() {
  return (
    <aside aria-label="Acceso directo a contacto rápido">
      {/* Botón Flotante WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=525535209725"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        title="Contacto Celular WhatsApp"
        aria-label="WhatsApp EuroCentro"
      >
        <img
          src="/View/Images/whatsapp.png"
          width="32"
          height="32"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
        />
      </a>

      {/* Botón Flotante Llamada */}
      <a
        href="tel:+52-55-3520-9725"
        className="fixed bottom-6 right-24 z-40 w-14 h-14 rounded-full bg-ec-blue-primary flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
        title="Contacto Telefónico"
        aria-label="Llamada Telefónica EuroCentro"
      >
        <img
          src="/View/Images/llamada.png"
          width="32"
          height="32"
          alt="Llamada"
          className="w-8 h-8 object-contain"
        />
      </a>
    </aside>
  );
}

