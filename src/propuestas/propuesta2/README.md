# Propuesta 2 (Derecha) - EuroCentro

Esta carpeta contiene la **Propuesta 2 (Derecha / Estilo Apple Editorial)**. Está 100% aislada e independiente.

## Archivos:
- `Propuesta2.jsx`: Componente principal con narrativa a la izquierda, formulario a la derecha, interacción de auto-selección de curso al hacer clic en las tarjetas, SweetAlert2 y widgets flotantes.
- `propuesta2.css`: Hoja de estilos con paleta corporativa Navy 950/Blue Primary, tipografía SF Pro / Inter y diseño editorial.

## Si esta propuesta es la ELEGIDA:
1. Elimina la carpeta de la otra propuesta: `src/propuestas/propuesta1/`.
2. En `src/App.jsx`, cambia el componente para importar únicamente `Propuesta2`:
```jsx
import Propuesta2 from './propuestas/propuesta2/Propuesta2.jsx';

export default function App() {
  return <Propuesta2 />;
}
```

## Si esta propuesta es la RECHAZADA:
Simplemente elimina esta carpeta completa (`src/propuestas/propuesta2/`).

