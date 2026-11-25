# Sistema de diseño

Los valores viven en [`tokens.css`](tokens.css) y [`styles.css`](styles.css) solo los usa: no hay colores
sueltos en el CSS. Tono: **cálido y sereno**. La base es crema y arena, el celeste da calma y el terracota
marca pequeños detalles.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#faf6f0` | Fondo de página (crema) |
| `--color-bg-alt` | `#f2ebe1` | Secciones alternas (arena) |
| `--color-bg-tint` | `#eaf3f6` | Destacados: paquete recomendado, hover de tarjetas |
| `--color-surface` | `#fffdf9` | Tarjetas y cajas sobre el fondo |
| `--color-text` | `#2f3b40` | Texto principal, títulos y fondo del pie |
| `--color-text-muted` | `#5c6a6f` | Texto secundario (5,2:1 sobre crema) |
| `--color-text-inverse` | `#fff` | Texto sobre acento o sobre el pie |
| `--color-accent` | `#3e7189` | Botones y enlaces (5,35:1 con blanco) |
| `--color-accent-hover` | `#2e5a6f` | Hover de botones y enlaces |
| `--color-warm` | `#94572f` | Antetítulos, duraciones, viñetas, "+" de las preguntas |
| `--color-sky` / `--color-sky-strong` | `#a9d0e2` / `#4f87a1` | Celeste decorativo / legible en números grandes |
| `--color-peach` | `#f1d9c4` | Aura del inicio y etiqueta "Recomendado" |
| `--color-border` | `#e6dccd` | Bordes de tarjetas y separadores |
| `--color-border-subtle` | `rgba(47,59,64,.1)` | Separadores dentro de listas |

**Criterio:**
- El **acento azul es solo para acciones**: botones y enlaces.
- El **terracota es para detalles pequeños**, nunca para bloques grandes.
- **Celeste y durazno son decorativos**: no llevan texto encima, salvo `--color-sky-strong` en los números de los pasos.
- Cualquier texto nuevo debe tener al menos **4,5:1** de contraste. Los tests de accesibilidad lo comprueban.

## Tipografía

- **Serif** (`--font-serif`, Iowan / Palatino / Georgia): títulos, antetítulos en cursiva, precios, cita y marca.
- **Sans** (`--font-sans`, fuentes del sistema): cuerpo de texto e interfaz.
- Son fuentes del sistema: no se cargan fuentes externas.

| Token | Tamaño | Uso |
|---|---|---|
| `--fs-h1` | `clamp(2.3rem, 6.5vw, 3.9rem)` | Titular del inicio |
| `--fs-h2` | `clamp(1.8rem, 4.2vw, 2.6rem)` | Títulos de sección |
| `--fs-display` / `--fs-display-sm` | 2.6rem / 2.4rem | Precios / números de los pasos |
| `--fs-3xl` · `--fs-2xl` · `--fs-xl` | 1.35 · 1.3 · 1.2rem | h3 · cita · títulos de tarjeta |
| `--fs-lg` · `--fs-md` | 1.15 · 1.1rem | Entradilla · antetítulo |
| `--fs-body` | 1.0625rem (17px) | Cuerpo de texto |
| `--fs-base` | 1rem | Botones |
| `--fs-sm` · `--fs-xs` · `--fs-2xs` | 0.95 · 0.92 · 0.9rem | Texto auxiliar · notas y pie · botón de la cabecera móvil |
| `--fs-fluid` | `clamp(1rem, 4.4vw, 1.2rem)` | Marca y preguntas (se achican en móvil) |

**Interlineado:** 1.7 en el cuerpo, 1.15 en los títulos, 1.45 en la cita y 1–1.1 en los números grandes.
**Pesos:** 400 en los títulos (la serif ya tiene presencia), 500 en botones y acciones, 600 para énfasis.

## Espaciado, layout y radios

- **Espaciado:** escala de base 4 px (`--space-1` = 4px … `--space-16` = 64px, más 72 y 104px).
  - **Secciones:** `--section-pad` es 72px en móvil y 104px desde 900px.
  - **Margen lateral:** `--gutter` es 20px, y 32px desde 720px.
- **Layout:**
  - `--container` 1080px, el ancho máximo del contenido.
  - `--container-narrow` 760px, para textos largos, preguntas y el cierre.
  - `--measure-head` 640px, para las cabeceras de sección.
  - `--header-height` 64px.
- **Radios:**
  - `--radius-xl` 22px: tarjetas.
  - `--radius-lg` 14px: cajas de nota.
  - `--radius-pill`: botones y etiquetas.
  - `--radius-arch` 200px: arco de la foto.
  - `--radius-round` 50%: círculos.
- **Sombras:** casi no hay; la profundidad la dan los fondos alternos.
  - `--shadow-header`: línea de 1px bajo la cabecera al hacer scroll.
  - `--shadow-menu`: sombra suave del menú móvil.
  - `--shadow-halo`: aro de las viñetas.

## Botones

Comparten forma: **pastilla**, alto de 48px (40px en `.btn-small`), borde de 1.5px, texto de 1rem en peso 500.

| | Reposo | Hover | Uso |
|---|---|---|---|
| **Primario** `.btn` | fondo y borde `--color-accent`, texto blanco | `--color-accent-hover` | La acción principal de cada bloque (reservar) |
| **Secundario** `.btn-ghost` | sin fondo, borde y texto `--color-accent` | fondo `--color-accent-soft`, texto `--color-accent-hover` | Alternativas ("Cómo es una sesión", paquetes no destacados) |

**Criterio:**
- **Un solo botón primario por bloque.**
- **Sobre el aura del inicio**, el secundario lleva fondo `--color-surface-translucent` para mantener el contraste.

## Movimiento

- **Curva:** `--ease-out`.
- **Duración:** `--duration-fast` (0.25s) para hovers y `--duration-reveal` (1s) para las apariciones al hacer scroll.
- **Movimiento reducido:** si el sistema lo pide, todo aparece sin animar.

## Pendiente de consolidar

Para no cambiar el diseño se documentaron todos los valores existentes, incluidos algunos casi iguales que
podrían unificarse en el futuro:
- Tamaños: 0.9 / 0.92 / 0.95rem y 1.3 / 1.35 / 1.4rem.
- Medidas puntuales: 2, 6, 10, 14, 18, 22, 26, 30, 34, 36 y 88px, que siguen escritas a mano en `styles.css`
  porque no coinciden con la escala de 4px.
