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

## Datos reales de la tienda

Ya reflejados en las plantillas:

- Envío: **5 a 12 días laborables**
- Devoluciones: **15 días desde la recepción** (el mínimo legal en la UE son 14 desde
  que el cliente recibe el pedido, no desde que compra)
- Producto: Dispensador de jabón con cepillo, 19,99 €, en gris y verde. Publicado en
  los canales de venta, pero el escaparate aún no es público.

## Qué falta

1. **Instalar el tema en la tienda.** El tema activo es Horizon, el que trae Shopify
   por defecto: nada de este repositorio está en la tienda todavía. El conector no
   permite crear ni publicar temas, así que hay que conectarlo desde
   *Online Store → Themes → Add theme → Connect from GitHub*, rama
   `claude/shopify-store-connection-53vq25`.
2. **Lanzar la tienda.** `onlineStoreUrl` sigue devolviendo null aunque el producto
   está publicado en los tres canales, lo que apunta a que el escaparate sigue
   protegido por contraseña. Se comprueba en *Online Store → Preferences*.
3. **Aviso legal (LSSI).** Obligatorio en España: nombre o razón social, NIF,
   domicilio y correo de contacto. Sin escribir por no disponer de esos datos.
4. **Medidas del producto.** Por decisión del cliente la ficha no las lleva. Si se
   quieren añadir, hay que medir el producto o pedir la ficha al proveedor.
5. Reseñas: no hay bloque de reseñas, y no se pondrá ninguna inventada.

## Ya resuelto en la tienda

- Un solo producto: variantes Gris y Verde a **19,99 €, sin precio tachado**. El
  comparativo de 40 € se retiró: sin historial de ventas, anunciar esa rebaja es
  una práctica comercial engañosa (Directiva Omnibus / RDL 24/2021).
- Siete fotos con texto alternativo, la de los dos colores como principal, y cada
  color enlazado a su variante.
- Materiales: plástico reforzado con pulsador de dedo. Sin medidas, por decisión del cliente.
- Inventario **sin controlar** en ambas variantes, para que no aparezca «Agotado»
  con plazos de envío de 5 a 12 días.
- Publicado en los tres canales de venta y añadido a la colección de portada.
- Políticas de envío y devoluciones publicadas en *Settings → Policies*.
- Se creó un producto duplicado por el camino; el sobrante quedó **archivado**, no
  borrado, con el handle `dispensador-borrador-antiguo`.

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
