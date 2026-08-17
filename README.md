# Aurea — tema de Shopify

Tema para la tienda `aurea-17783`. Menaje y utensilios de cocina.

Estado: **esqueleto funcional**. Pasa `theme check` sin avisos, pero todavía no se ha
subido a ninguna tienda ni se ha visto en un navegador.

## Estructura

```
assets/       base.css (sistema de diseño), global.js (sin dependencias)
config/       settings_schema.json + settings_data.json (colores, tipografía, layout)
layout/       theme.liquid, password.liquid
locales/      es.default.json (textos), es.default.schema.json (editor)
sections/     19 secciones + header-group / footer-group
snippets/     product-card, price, icon
templates/    11 plantillas JSON
```

## Sistema de diseño

Todo el color y la tipografía sale de `config/settings_*.json` y se inyecta como
variables CSS en `layout/theme.liquid`. `assets/base.css` solo consume esas variables,
así que la marca se cambia entera desde el editor de temas sin tocar código.

| Token | Valor | Por qué |
|---|---|---|
| Fondo | `#FFFFFF` | Producto de cocina: limpio y luminoso, no editorial oscuro |
| Acento | `#7FA93F` | El verde del propio producto |
| Texto | `#1D2321` | Carbón con matiz verde, más cálido que el negro puro |
| Redondeo | `8px` | Suave, doméstico. A `0` queda más plano y editorial |
| Foto | Cuadrada 1:1 | Producto sobre fondo, no moda vertical |

## Decisiones que ya están tomadas en el código

- **Mobile-first.** Áreas de pulsación de 44-48 px mínimo en todos los controles.
- **Sticky Add to Cart en móvil**, que aparece al pasar el bloque de compra
  (`IntersectionObserver`, se oculta en escritorio).
- **Selector de variantes sin recargar**: actualiza precio, disponibilidad, el `id`
  del formulario y la URL.
- **Ficha de producto orientada a menaje**: desplegables de *Medidas y materiales*,
  *Cómo se usa* y *Envío y devoluciones* en lugar de guía de tallas.
- **Barra de envío gratis** en el carrito, opcional, configurable por importe.
- `prefers-reduced-motion` respetado, foco visible, `skip link`, textos en `locales/`.

## Qué falta

1. **Catálogo.** La tienda está vacía. Sin productos el tema no se puede ver de verdad.
2. **Fotos reales del producto** y logo.
3. **Textos de confianza reales**: plazos de envío, política de devoluciones,
   datos de la empresa. Los valores por defecto (24-48 h, 30 días) son marcadores —
   hay que cambiarlos por lo que realmente se pueda cumplir.
4. Reseñas: no hay bloque de reseñas todavía, y no se pondrá ninguna inventada.

## Subir el tema a la tienda

Requiere el CLI de Shopify y permisos sobre `aurea-17783`.

```bash
npm i -g @shopify/cli
shopify theme dev  --store aurea-17783   # vista previa local con datos reales
shopify theme push --store aurea-17783 --unpublished   # sube como borrador
```

Trabaja siempre sobre un tema **sin publicar** y publica solo cuando esté revisado.
Shopify no guarda historial de los archivos del tema: si dos personas suben a la vez
sobre el mismo tema, el último sobrescribe al anterior sin aviso.

## Validación

```bash
npx @shopify/cli theme check --path .
```
