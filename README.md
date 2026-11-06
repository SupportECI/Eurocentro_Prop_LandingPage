# EuroCentro Landing Page (React + Vite)

Landing Page oficial de **EuroCentro** desarrollada en **React + Vite** con **JavaScript puro (JSX)**, siguiendo las mejores prácticas y principios de **Apple Design**.

---

## 🚀 Inicio Rápido

1. Instalar dependencias (si no las tienes):
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo en Vite:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

3. Compilar para producción:
   ```bash
   npm run build
   ```

4. Previsualizar la build de producción:
   ```bash
   npm run preview
   ```

---

## 🗂 Estructura del Proyecto

```
├── public/                       # Recursos estáticos e imágenes (View/Images/)
│   └── View/
│       ├── App/                  # intlTelInput con utilidades
│       ├── Css/                  # intlTelInput.css
│       └── Images/               # Banderas, iconos y fondos
├── src/
│   ├── propuestas/
│   │   └── propuesta2/           # 💎 PROPUESTA OFICIAL (Apple Editorial)
│   │       ├── Propuesta2.jsx    # Componente principal con maquetación y lógica
│   │       ├── VideoCarousel2.jsx# Carrusel de videos (3 simultáneos, drag 1:1)
│   │       ├── GalleryCarousel2.jsx# Galería pura de fotos (carrusel infinito)
│   │       └── propuesta2.css    # Hoja de estilos de la landing page
│   ├── App.jsx                   # Renderiza Propuesta2 directamente
│   ├── main.jsx                  # Entrada de React
│   └── index.css                 # Estilos globales y reset
├── index.html                    # HTML base con meta tags, Google Tag Manager y Bootstrap
├── vite.config.js                # Configuración de Vite
└── package.json
```

---

## ✨ Características Principales

- **Diseño Apple:** Paleta EuroCentro Navy 950 con acento azul, tipografía SF Pro / Inter y badge amarillo vibrante `#ffcc00` en el formulario.
- **Formulario de Captación:** Validación reactiva, selector de código de país internacional con banderas (+52 por defecto), sanitización y envío asíncrono con alertas de **SweetAlert2**.
- **Galería Fotográfica:** Cinta continua infinita de fotografías (*pure images* sin textos) con máscaras difuminadas en los extremos, ubicada estratégicamente antes de los testimonios.
- **Carrusel de Videos Testimoniales:** Muestra 3 videos simultáneos en pantalla con movimiento interactivo (arrastre táctil/ratón 1:1, flechas y teclado) y reproducción al clic.
- **Acceso Rápido Flotante:** Botones de llamada telefónica y chat de WhatsApp directos.
