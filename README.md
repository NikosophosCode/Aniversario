# 💖 Proyecto: Página Interactiva de Aniversario

Experiencia web romántica y multimedia con música, videos, galería, mensajes ocultos, efectos animados y easter eggs.  
Archivos principales:  
- [index.html](index.html)  
- [CSS/styles.css](CSS/styles.css)  
- [Scripts/main.js](Scripts/main.js)  
- [INSTRUCCIONES.md](INSTRUCCIONES.md)

## 📂 Estructura
- `index.html`: Marca la estructura de secciones (hero, videos, timeline, galería, modal, footer).
- `CSS/styles.css`: Variables, layout, animaciones, responsive.
- `Scripts/main.js`: Inicialización y lógica interactiva.
- `assets/`: `audio/` (música) y `img/` (fotos, videos MP4).
- `INSTRUCCIONES.md`: Guía funcional original (contiene algunos códigos que no están en el JS actual).

## 🚀 Inicialización
Abrir directamente `index.html` en un navegador moderno. No requiere servidor ni build.

Toda la lógica se arranca en `DOMContentLoaded` llamando a:
- [initializeParticles](Scripts/main.js)
- [initializeFloatingHearts](Scripts/main.js)
- [initializeScrollAnimations](Scripts/main.js)
- [initializeHiddenMessages](Scripts/main.js)
- [initializeKeyboardSecrets](Scripts/main.js)
- [initializeMusicControls](Scripts/main.js)
- [initializeVideoControls](Scripts/main.js)

## ✨ Funcionalidades Principales

### Música
- Elemento `<audio id="background-music">` en [index.html](index.html).
- Control con botón (ícono Font Awesome).
- Lógica: [initializeMusicControls](Scripts/main.js) y [toggleMusic](Scripts/main.js).
- Volumen adaptativo cuando se reproducen videos.

### Videos
- Sección “Nuestros Momentos en Video”.
- Reproducción auto-silenciosa al entrar en viewport usando `IntersectionObserver` en [initializeVideoControls](Scripts/main.js).
- Clic para pausar/reproducir: [toggleVideoPlay](Scripts/main.js).
- Overlay dinámico (íconos play/pause).

### Galería
- Grid responsivo (CSS grid).
- Click abre modal: [openModal](Scripts/main.js), cerrar con [closeModal](Scripts/main.js).
- Doble clic muestra mensaje oculto: gestionado en [initializeHiddenMessages](Scripts/main.js).

### Mensajes Ocultos
- Clic en título principal: [initializeHiddenMessages](Scripts/main.js) → [showHiddenMessage](Scripts/main.js).
- Doble clic en fotos: mensajes personalizados (array interno).
- Modal romántico principal: [showMessage](Scripts/main.js) (activado por el corazón interactivo).

### Códigos Secretos por Teclado
Implementados en [initializeKeyboardSecrets](Scripts/main.js) con mapa `secretCodes`.  
Códigos vigentes (clave → mensaje):
```
amor, beso, forever, corazon, viaje, luna, sol, cielo, angel, bombon
```
Los códigos mencionados en [INSTRUCCIONES.md](INSTRUCCIONES.md) que NO están en el código actual: `estrella`, `dream`.  
Mostrar mensaje: [showKeyboardMessage](Scripts/main.js). Cerrar: [closeKeyboardMessage](Scripts/main.js).

### Efectos Visuales
- Partículas: [initializeParticles](Scripts/main.js) + [createParticle](Scripts/main.js).
- Corazones flotantes continuos: [initializeFloatingHearts](Scripts/main.js) + [createFloatingHeart](Scripts/main.js).
- Explosión puntual: [createHeartBurst](Scripts/main.js).
- Partículas de cursor: [createCursorParticle](Scripts/main.js) (con throttle: [throttle](Scripts/main.js)).

### Animaciones al Scroll
- Observador sobre `.timeline-item` y `.gallery-item`: [initializeScrollAnimations](Scripts/main.js).

### Utilidades
- Colores aleatorios: [getRandomPinkColor](Scripts/main.js).
- Scroll suave: [smoothScroll](Scripts/main.js) (no usado actualmente, listo para enlaces internos).

## 🎨 Estilos (CSS)
- Variables en `:root` (colores temáticos).
- Animaciones declaradas: `float`, `heartFloat`, `musicPulse`, `heartbeat`, `heartPulse`, `fadeIn`, `fadeInUp`, `slideInUp`.
- Responsivo mediante `@media (max-width: 768px)` y `480px`.
- Gradientes y blur (backdrop-filter) para estética moderna.

## 🔐 Accesibilidad (Recomendaciones)
Pendiente si se desea mejorar:
- Añadir `alt` descriptivos más específicos a imágenes.
- Añadir `aria-label` a botón de música.
- Permitir cerrar modal con tecla Escape (ya implementado en mensaje secreto, podría reutilizarse para fotos).
- En videos, agregar `aria-describedby` para overlay.

## 🛠 Personalización Rápida
1. Música: reemplazar `assets/audio/love-song.mp3`.
2. Fotos: sustituir archivos en `assets/img/` y ajustar nombres en [index.html](index.html).
3. Videos: añadir más contenedores `.video-container` siguiendo el patrón.
4. Timeline: editar bloques dentro de `<section id="timeline">`.
5. Mensajes secretos: modificar objeto `secretCodes` en [Scripts/main.js](Scripts/main.js).
6. Paleta: cambiar variables en [CSS/styles.css](CSS/styles.css) (`:root`).

## ➕ Añadir un Nuevo Código Secreto
Editar objeto `secretCodes` en [Scripts/main.js](Scripts/main.js):
```js
// ...existing code...
const secretCodes = {
    // existentes...
    'nueva': 'Tu nuevo mensaje personalizado 💞'
};
// ...existing code...
```

## 🧱 Flujo Técnico Resumido
1. Carga DOM → se disparan inicializadores.
2. Efectos visuales persistentes (partículas + corazones) usan timers/animaciones CSS.
3. Interacción usuario (clic, dblclick, teclado) genera overlays o modales temporales.
4. Observadores optimizan reproducción de video y animaciones de entrada.

## ⚙️ Rendimiento
- Uso de `IntersectionObserver` para pausar videos fuera de vista.
- Generación moderada de partículas (50 iniciales).
- Throttle en eventos de cursor: [throttle](Scripts/main.js).
- Eliminación de nodos tras animaciones (limpieza en [createFloatingHeart](Scripts/main.js) y [createHeartBurst](Scripts/main.js)).

## 🧪 Ideas de Mejora
- Persistencia (localStorage) para registrar códigos descubiertos.
- Botón “Siguiente foto” en modal.
- Modo oscuro alternativo (ya hay base con variables).
- Integrar un slider de música extra.
- Reemplazar mediciones absolutas por `prefers-reduced-motion`.

## 🩹 Inconsistencias Detectadas
- Desfase entre códigos documentados y los reales (ver sección Códigos Secretos).
- `smoothScroll` no utilizado actualmente.
- No hay manejo de foco al abrir modal (accesibilidad mejorable).

## 🔍 Índice de Funciones (JS)
Todas en [Scripts/main.js](Scripts/main.js):  
[initializeParticles](Scripts/main.js), [createParticle](Scripts/main.js), [initializeFloatingHearts](Scripts/main.js), [createFloatingHeart](Scripts.main.js), [createHeartBurst](Scripts/main.js), [initializeScrollAnimations](Scripts/main.js), [initializeHiddenMessages](Scripts/main.js), [showHiddenMessage](Scripts/main.js), [initializeKeyboardSecrets](Scripts/main.js), [showKeyboardMessage](Scripts/main.js), [closeKeyboardMessage](Scripts/main.js), [showMessage](Scripts.main.js), [initializeMusicControls](Scripts/main.js), [toggleMusic](Scripts.main.js), [initializeVideoControls](Scripts.main.js), [toggleVideoPlay](Scripts.main.js), [openModal](Scripts.main.js), [closeModal](Scripts.main.js), [createCursorParticle](Scripts.main.js), [throttle](Scripts.main.js), [getRandomPinkColor](Scripts.main.js), [smoothScroll](Scripts.main.js).

## ✅ Resumen
Proyecto listo para usarse como detalle personalizable de aniversario: simple de desplegar, visualmente atractivo y extensible.

---
Hecho con cariño técnico.