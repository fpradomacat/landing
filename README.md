# Prado Macat · Landing

Landing de una página (HTML/CSS/JS sin frameworks) para las sesiones 1:1 de coaching + breathwork.
Se publica en **https://federico.pradomacat.com** con GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Contenido y textos |
| `styles.css` | Estilos (colores en `:root`) |
| `main.js` | Link de reserva y email (objeto `CONFIG` arriba del archivo), menú móvil |
| `favicon.svg` | Icono |
| `CNAME` | Subdominio para GitHub Pages |

Para verla en local:

```powershell
python -m http.server 8080
```

y abrir http://localhost:8080.

## Pendientes antes de publicar

Los puntos marcados con `TODO` en el código:

- [ ] **Quitar `<meta name="robots" content="noindex, nofollow">`** en `index.html` (ahora bloquea a Google mientras hay textos provisionales).
- [ ] **Link de reserva**: `CONFIG.bookingUrl` en `main.js`. Vacío = los botones bajan a la sección final.
- [ ] **Email**: `CONFIG.email` en `main.js` y los dos `mailto:` de `index.html` (hoy `hola@pradomacat.com`, provisional).
- [ ] **Precios de lanzamiento** (provisionales, hasta marzo 2027): 55 € suelta · 250 € (5) · 450 € (10). Vigencias 4 y 8 meses. No mostrar un precio "anterior" tachado si nunca se cobró.
- [ ] **Sobre mí**: el texto es un borrador; contarlo con tus palabras. Añadir escuela y año del Practitioner en PNL.
- [ ] **Foto**: guardar como `assets/fede.jpg` (~800×1000, < 150 KB, JPG o WebP) y reemplazar el `div.photo-placeholder`.
- [ ] **Contraindicaciones**: confirmar la lista con tu formación.
- [ ] **Política de sesiones**: cancelación (24 h), vigencia de paquetes, medios de pago.
- [ ] **Revisión legal** (España y Argentina): descargo, contraindicaciones y aviso legal/privacidad.
- [ ] **Imagen Open Graph** `assets/og-image.jpg` (1200×630) y descomentar su `<meta>`.
- [ ] **Testimonios**: la sección no existe. Añadirla solo con testimonios reales y con permiso.

## Publicar en GitHub Pages con el subdominio

1. Subir el repo a GitHub. En **Settings → Pages**: *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
2. En **Settings → Pages → Custom domain** poner `federico.pradomacat.com` (ya está en el archivo `CNAME`).
3. En **Cloudflare → DNS** de `pradomacat.com`, crear:
   - Tipo `CNAME`, nombre `federico`, destino `<tu-usuario>.github.io`, **Proxy: DNS only (nube gris)**.
4. Esperar a que GitHub verifique el dominio y emita el certificado, y activar **Enforce HTTPS**.
   Si después quieres activar el proxy de Cloudflare (nube naranja), pon SSL/TLS en modo **Full**.
5. Recomendado: en **Settings → Pages → Verified domains** (de tu cuenta) verificar `pradomacat.com` para evitar que otro repo use el subdominio.

Para el dominio principal (`pradomacat.com`) no hace falta tocar nada ahora.

## Criterios de contenido

- Sin afirmaciones de salud, curación ni resultados garantizados.
- Sin "certificado" ni "facilitador acreditado" hasta terminar la formación (~marzo 2027).
- Español neutro: "tú" sin formas marcadas de España (vosotros, vale…) ni voseo.
