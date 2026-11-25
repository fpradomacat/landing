# Federico Prado Macat · Landing

Landing de una página (HTML/CSS/JS sin frameworks) para las sesiones 1:1 de coaching + breathwork.
Publicada en **https://pradomacat.com**. Cada commit que llega a `master` se publica automáticamente.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Contenido, textos y metadatos (SEO, Open Graph) |
| `tokens.css` | Tokens de diseño: colores, tipografía, espaciado, radios, botones (ver `DESIGN.md`) |
| `styles.css` | Estilos de la página, construidos con los tokens |
| `DESIGN.md` | Resumen del sistema de diseño y criterios de uso |
| `main.js` | Link de reserva y email (objeto `CONFIG` arriba del archivo), menú móvil |
| `assets/fede.webp`, `assets/fede.jpg` | Foto de "Sobre mí" (800×1000, sin metadatos EXIF) |
| `assets/og-image.jpg` | Imagen al compartir el enlace en redes (1200×630) |
| `favicon.svg`, `assets/icon-192.png`, `assets/apple-touch-icon.png` | Iconos (navegador, Google, pantalla de inicio de iPhone) |
| `robots.txt`, `sitemap.xml` | Indexación en buscadores |
| `CNAME` | Subdominio |
| `.claude/launch.json` | Servidor local para la vista previa en Claude |
| `tests/` | Tests automáticos (ver abajo) |
| `.github/workflows/tests.yml` | Ejecuta los tests en GitHub en cada push |

Para verla en local:

```powershell
python -m http.server 8080
```

y abrir http://localhost:8080.

## Tests automáticos

En `tests/` hay una batería de tests con [Playwright](https://playwright.dev) y [axe](https://github.com/dequelabs/axe-core)
que abren la web en un navegador real, en escritorio (1364×757) y en móvil (375×812). Comprueban:

- **Carga:** sin errores de consola ni archivos rotos; `robots.txt`, sitemap e imágenes publicados.
- **Maquetación:** sin scroll horizontal, inicio a pantalla completa, foto en 4:5, los enlaces del menú
  dejan el título bajo la cabecera, las tarjetas de Precios entran en pantalla, menú móvil y botón "Reservar".
- **Enlaces:** reservas a Calendly en pestaña nueva, anclas internas válidas, Neyen, YouTube y email.
- **Animaciones:** nada queda oculto tras el scroll, con movimiento reducido ni sin JavaScript; la flecha se oculta.
- **SEO:** longitudes de título y descripción, Open Graph, y que los precios y las preguntas frecuentes
  de los datos estructurados coincidan con la página.
- **Contenido:** sin palabras prohibidas por el brief (cura, sana, certificado, acreditado, garantiza…),
  descargo y contraindicaciones presentes, imágenes livianas y sin EXIF, textos alternativos.
- **Accesibilidad:** WCAG 2.1 AA con axe (contraste, etiquetas, estructura).

Para ejecutarlos en local:

```powershell
cd tests
npm install
npx playwright install chromium
npm test
```

`npm run test:ui` abre una interfaz para verlos paso a paso y `npm run report` muestra el último informe.

En GitHub se ejecutan solos en cada push a `master` y en cada pull request (pestaña **Actions**).
Ojo: la publicación automática no espera a los tests. Para no publicar algo roto, ejecuta `npm test`
antes de hacer push, o trabaja en una rama y haz merge a `master` cuando los tests estén en verde.

## Enlaces externos

- Reserva de la llamada exploratoria: https://calendly.com/pradomacat/exploratoria
  (en los botones de `index.html` y en `CONFIG.bookingUrl`). Se abre en una pestaña nueva,
  sin embeber el widget de Calendly, para no cargar cookies de terceros.
- App Neyen: https://neyen.pradomacat.com
- YouTube: https://www.youtube.com/@meditawork

## Pendientes

- [ ] **Quitar el `noindex`** de `index.html` cuando esté la revisión legal (está puesto a propósito;
  `robots.txt` debe seguir permitiendo el acceso para que Google pueda leerlo). Después, dar de alta la web en Search Console.
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
`pradomacat.com`, el dominio principal. `federico.pradomacat.com` (y `www.pradomacat.com`) deben
redirigir con un 301 a `pradomacat.com` conservando la ruta; se configura en Cloudflare, no en este
repositorio. `neyen.pradomacat.com` es otro proyecto y no se toca.

## Criterios de contenido

- Sin afirmaciones de salud, curación ni resultados garantizados.
- Sin "certificado" ni "facilitador acreditado" hasta terminar la formación (~marzo 2027).
- Español neutro: "tú" sin formas marcadas de España (vosotros, vale…) ni voseo.
- Sin cookies ni scripts de terceros (por eso las fuentes son del sistema y Calendly va como enlace).
