# Aurea — tema de Shopify

Tema para la tienda `aurea-17783`. Menaje y utensilios de cocina.

La home es una **landing de producto único** para tráfico de TikTok/Reels: mobile-first,
un solo CTA repetido («Comprar ahora») y barra de compra fija en móvil.

Pasa `theme check` sin avisos. Está subido a la tienda como tema **sin publicar**.

## Estructura

```
assets/       base.css (sistema de diseño), global.js (sin dependencias)
config/       settings_schema.json + settings_data.json (colores, tipografía, layout)
layout/       theme.liquid, password.liquid
locales/      es.default.json (textos), es.default.schema.json (editor)
sections/     26 secciones + header-group / footer-group
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

1. **Los dos vídeos.** La landing tiene los huecos marcados y funcionando:
   el del hero (autoplay, en bucle, sin sonido) y el demo (con controles,
   sin autoplay para no penalizar la carga). Se suben desde el editor de temas.
   Vertical 9:16 y comprimidos, por debajo de 5 MB.
2. **Datos de la empresa.** Aparecen como `[PENDIENTE]` en el aviso legal, los
   términos y el cierre de la landing: razón social, NIF y domicilio. Es
   obligatorio (LSSI) antes de abrir al público.
3. **Dos respuestas de la FAQ**, marcadas PENDIENTE porque no se inventan:
   capacidad del depósito en ml y si admite lavavajillas.
4. **Reseñas.** La sección está montada y vacía a propósito. Se rellena con
   reseñas reales de clientas, una por bloque, desde el editor.
5. **Publicar el tema y quitar la contraseña de la tienda** cuando esté revisado.

## Estructura de la landing

Hero → Problema/promesa → Cómo funciona → Beneficios → Vídeo demo → Reseñas →
Packs → FAQ → CTA final, más la barra de compra fija en móvil.

## Ya resuelto en la tienda

- Un solo producto con dos opciones, Color y Pack, y seis variantes:
  1 unidad 19,99 € · Pack de 2 35 € (17,50 €/u) · Pack de 3 50 € (16,67 €/u).
  Los packs llevan precio comparativo real (2 y 3 unidades sueltas), que sí es
  legítimo porque 19,99 € es el precio de venta actual de una unidad.
- Páginas legales creadas y enlazadas en el footer: aviso legal, política de
  cookies y términos y condiciones, junto a las políticas de privacidad,
  devoluciones y envíos.
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
