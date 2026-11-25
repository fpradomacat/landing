# Federico Prado Macat · Landing

Landing de una página (HTML/CSS/JS sin frameworks) para las sesiones 1:1 de coaching + breathwork.
Se publicará en **https://federico.pradomacat.com** con GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Contenido, textos y metadatos (SEO, Open Graph) |
| `styles.css` | Estilos (colores y fuentes en `:root`) |
| `main.js` | Link de reserva y email (objeto `CONFIG` arriba del archivo), menú móvil |
| `assets/fede.webp`, `assets/fede.jpg` | Foto de "Sobre mí" (800×1000, sin metadatos EXIF) |
| `assets/og-image.jpg` | Imagen al compartir el enlace en redes (1200×630) |
| `favicon.svg` | Icono |
| `CNAME` | Subdominio para GitHub Pages |
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

## Pendientes antes de publicar

En el código están marcados con `TODO`:

- [ ] **Quitar `<meta name="robots" content="noindex, nofollow">`** en `index.html` (ahora impide que Google la indexe).
- [ ] **Email**: hoy `hola@pradomacat.com`, provisional. Cambiarlo en `CONFIG.email` de `main.js` y en los dos `mailto:` de `index.html`.
- [ ] **Precios de lanzamiento** (provisionales, hasta marzo 2027): 55 € suelta · 250 € (5) · 450 € (10). Vigencias de 4 y 8 meses. No mostrar un precio "anterior" tachado si nunca se cobró.
- [ ] **Sobre mí**: revisar el texto y confirmar los datos.
- [ ] **Contraindicaciones**: confirmar la lista con la formación.
- [ ] **Política de sesiones**: cancelación (24 h), vigencia de paquetes y formas de pago.
- [ ] **Revisión legal** (España y Argentina): descargo, contraindicaciones y aviso legal/privacidad.
- [ ] **Testimonios**: la sección no existe. Añadirla solo con testimonios reales y con permiso.

## Publicar en GitHub Pages con el subdominio

1. Subir el repo a GitHub. En **Settings → Pages** del repo: *Deploy from a branch*, carpeta `/ (root)`,
   y elegir la rama donde está el código (hoy es `master`; si prefieres `main`, renómbrala antes con `git branch -m master main`).
2. En **Settings → Pages → Custom domain** poner `federico.pradomacat.com` (ya está en el archivo `CNAME`).
3. En **Cloudflare → DNS** de `pradomacat.com`, crear:
   - Tipo `CNAME`, nombre `federico`, destino `<tu-usuario>.github.io`, **Proxy: DNS only (nube gris)**.
4. Esperar a que GitHub verifique el dominio y emita el certificado, y activar **Enforce HTTPS**.
   Si después activas el proxy de Cloudflare (nube naranja), pon SSL/TLS en modo **Full (strict)**.
5. Recomendado: en los **Settings de tu cuenta** de GitHub (no del repo) → **Pages → Verified domains**,
   verificar `pradomacat.com` para que ningún otro repo pueda usar el subdominio.

El dominio principal (`pradomacat.com`) y `neyen.pradomacat.com` no se tocan.

## Criterios de contenido

- Sin afirmaciones de salud, curación ni resultados garantizados.
- Sin "certificado" ni "facilitador acreditado" hasta terminar la formación (~marzo 2027).
- Español neutro: "tú" sin formas marcadas de España (vosotros, vale…) ni voseo.
- Sin cookies ni scripts de terceros (por eso las fuentes son del sistema y Calendly va como enlace).
