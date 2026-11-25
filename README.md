# Federico Prado Macat · Landing

Landing de una página (HTML/CSS/JS sin frameworks) para las sesiones 1:1 de coaching + breathwork.
Publicada en **https://federico.pradomacat.com**. Cada commit que llega a `master` se publica automáticamente.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Contenido, textos y metadatos (SEO, Open Graph) |
| `styles.css` | Estilos (colores y fuentes en `:root`) |
| `main.js` | Link de reserva y email (objeto `CONFIG` arriba del archivo), menú móvil |
| `assets/fede.webp`, `assets/fede.jpg` | Foto de "Sobre mí" (800×1000, sin metadatos EXIF) |
| `assets/og-image.jpg` | Imagen al compartir el enlace en redes (1200×630) |
| `favicon.svg`, `assets/icon-192.png`, `assets/apple-touch-icon.png` | Iconos (navegador, Google, pantalla de inicio de iPhone) |
| `robots.txt`, `sitemap.xml` | Indexación en buscadores |
| `CNAME` | Subdominio |
| `.claude/launch.json` | Servidor local para la vista previa en Claude |

Para verla en local:

```powershell
python -m http.server 8080
```

y abrir http://localhost:8080.

## Enlaces externos

- Reserva de la llamada exploratoria: https://calendly.com/pradomacat/exploratoria
  (en los botones de `index.html` y en `CONFIG.bookingUrl`). Se abre en una pestaña nueva,
  sin embeber el widget de Calendly, para no cargar cookies de terceros.
- App Neyen: https://neyen.pradomacat.com
- YouTube: https://www.youtube.com/@meditawork

## Pendientes

- [ ] **Revisión legal** (España y Argentina): descargo, contraindicaciones, aviso legal y privacidad
  (la web no recoge datos, pero las reservas pasan por Calendly).
- [ ] **Contraindicaciones**: confirmar la lista con la formación.
- [ ] **Política de sesiones**: cancelación (24 h), vigencia de paquetes y formas de pago.
- [ ] **Testimonios**: la sección no existe. Añadirla solo con testimonios reales y con permiso.

Precios de lanzamiento (hasta marzo 2027): 55 € suelta · 250 € (5) · 450 € (10), con vigencias de 4 y 8 meses.
No mostrar un precio "anterior" tachado si nunca se cobró.

## SEO

- Título, descripción, Open Graph y Twitter en el `<head>` de `index.html`.
- Datos estructurados (JSON-LD) con la persona, el servicio con sus precios y las preguntas frecuentes.
  **Si cambias precios o preguntas frecuentes, actualízalos también ahí.**
- `sitemap.xml`: actualizar `<lastmod>` cuando haya cambios de contenido importantes.
- Tras publicar: dar de alta la web en [Google Search Console](https://search.google.com/search-console),
  enviar el sitemap y pedir la indexación de la URL. Validar los datos con la
  [prueba de resultados enriquecidos](https://search.google.com/test/rich-results).

## Publicación

La web está conectada a través de Cloudflare: cada commit en `master` se publica solo en
`federico.pradomacat.com`. El dominio principal (`pradomacat.com`) y `neyen.pradomacat.com` no se tocan.

## Criterios de contenido

- Sin afirmaciones de salud, curación ni resultados garantizados.
- Sin "certificado" ni "facilitador acreditado" hasta terminar la formación (~marzo 2027).
- Español neutro: "tú" sin formas marcadas de España (vosotros, vale…) ni voseo.
- Sin cookies ni scripts de terceros (por eso las fuentes son del sistema y Calendly va como enlace).
