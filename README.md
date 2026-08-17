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
- Producto: Dispensador de jabón con cepillo, 19,99 €, en verde y gris. **En borrador.**

## Qué falta antes de publicar

1. **Medidas y materiales del producto.** La ficha tiene el bloque marcado como
   pendiente. No se han inventado: hay que medir el producto o pedir la ficha al
   proveedor (alto, ancho, capacidad del depósito en ml, material, si admite lavavajillas).
2. **Fotos.** El producto no tiene ninguna imagen todavía.
3. **Precio tachado de 40 €.** Está configurado, pero la tienda no tiene historial de
   ventas: anunciar una rebaja exige mostrar el precio más bajo de los 30 días
   anteriores (Directiva Omnibus / RDL 24/2021). O se vende a 40 € durante 30 días,
   o se lanza a 19,99 € sin tachar.
4. **Pegar las políticas.** Escritas en `docs/politicas/`. No se pudieron publicar por
   API: el conector no tiene el permiso `write_legal_policies`. Hay que pegarlas a mano
   en *Settings → Policies*.
5. **Aviso legal (LSSI).** Falta y es obligatorio en España: nombre o razón social,
   NIF, domicilio y correo de contacto. No se ha escrito porque no se dispone de esos
   datos.
6. Reseñas: no hay bloque de reseñas, y no se pondrá ninguna inventada.

## Ya resuelto en la tienda

- Producto en borrador con variantes Verde y Gris, 19,99 € y 40 € tachado.
- Materiales: plástico reforzado con pulsador de dedo. Sin medidas, por decisión del cliente.
- Inventario **sin controlar** en ambas variantes, para que no aparezca «Agotado»
  con plazos de envío largos.
- Producto añadido a la colección de portada.

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
