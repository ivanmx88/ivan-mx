/* Aurea — theme behaviour. Vanilla, no dependencies. */

(function () {
  'use strict';

  /* --- Mobile menu drawer ------------------------------------------------- */

  function initDrawer() {
    var drawer = document.querySelector('[data-drawer]');
    if (!drawer) return;

    var openers = document.querySelectorAll('[data-drawer-open]');
    var closers = drawer.querySelectorAll('[data-drawer-close]');
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var focusable = drawer.querySelector('a, button');
      if (focusable) focusable.focus();
    }

    function close() {
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    openers.forEach(function (el) {
      el.addEventListener('click', open);
    });

    closers.forEach(function (el) {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* --- Sticky add to cart -------------------------------------------------- */

  function initStickyAtc() {
    var sticky = document.querySelector('[data-sticky-atc]');
    var anchor = document.querySelector('[data-atc-anchor]');
    if (!sticky || !anchor || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          sticky.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { rootMargin: '0px 0px -100% 0px' }
    );

    observer.observe(anchor);
  }

  /* --- Quantity stepper ---------------------------------------------------- */

  function initQuantity() {
    document.querySelectorAll('[data-quantity]').forEach(function (wrapper) {
      var input = wrapper.querySelector('input');
      if (!input) return;

      wrapper.querySelectorAll('[data-quantity-change]').forEach(function (button) {
        button.addEventListener('click', function () {
          var step = parseInt(button.getAttribute('data-quantity-change'), 10);
          var min = parseInt(input.getAttribute('min') || '1', 10);
          var next = (parseInt(input.value, 10) || min) + step;
          input.value = Math.max(min, next);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* --- Variant picker ------------------------------------------------------ */

  function initVariantPickers() {
    document.querySelectorAll('[data-variant-picker]').forEach(function (picker) {
      var dataEl = picker.querySelector('[data-variant-data]');
      if (!dataEl) return;

      var variants;
      try {
        variants = JSON.parse(dataEl.textContent);
      } catch (error) {
        return;
      }

      var form = document.querySelector('#' + picker.getAttribute('data-form'));
      var idInput = form ? form.querySelector('[name="id"]') : null;
      var priceEl = document.querySelector('[data-product-price]');
      var submitEl = form ? form.querySelector('[data-add-button]') : null;
      var stickySubmit = document.querySelector('[data-sticky-atc] [data-add-button]');
      var gallery = document.querySelector('[data-product-gallery]');
      var moneyFormat = picker.getAttribute('data-money-format') || '{{amount}}';
      var soldOutLabel = picker.getAttribute('data-sold-out-label') || 'Agotado';
      var addLabel = picker.getAttribute('data-add-label') || 'Añadir al carrito';
      var unavailableLabel = picker.getAttribute('data-unavailable-label') || 'No disponible';

      function formatMoney(cents) {
        var amount = (cents / 100).toFixed(2).replace('.', ',');
        return moneyFormat.replace(/\{\{\s*amount\s*\}\}/, amount);
      }

      function selectedOptions() {
        return Array.prototype.map.call(picker.querySelectorAll('[data-option-index]'), function (group) {
          var checked = group.querySelector('input:checked');
          return checked ? checked.value : null;
        });
      }

      function matchVariant(options) {
        for (var i = 0; i < variants.length; i++) {
          var variant = variants[i];
          var match = true;
          for (var j = 0; j < options.length; j++) {
            if (options[j] !== null && variant.options[j] !== options[j]) {
              match = false;
              break;
            }
          }
          if (match) return variant;
        }
        return null;
      }

      function setButtonState(button, variant) {
        if (!button) return;
        if (!variant) {
          button.disabled = true;
          button.textContent = unavailableLabel;
        } else if (!variant.available) {
          button.disabled = true;
          button.textContent = soldOutLabel;
        } else {
          button.disabled = false;
          button.textContent = addLabel;
        }
      }

      // Bring the selected variant's image to the front of the gallery, so
      // picking a colour shows that colour first without a page reload.
      function showVariantMedia(variant) {
        if (!gallery || !variant || !variant.featured_media_id) return;

        var target = gallery.querySelector('[data-media-id="' + variant.featured_media_id + '"]');
        if (!target || target === gallery.firstElementChild) return;

        gallery.prepend(target);
      }

      function update() {
        var variant = matchVariant(selectedOptions());

        if (variant && idInput) idInput.value = variant.id;

        showVariantMedia(variant);

        if (variant && priceEl) {
          var html = '<span class="price__current">' + formatMoney(variant.price) + '</span>';
          if (variant.compare_at_price && variant.compare_at_price > variant.price) {
            html += '<s class="price__compare">' + formatMoney(variant.compare_at_price) + '</s>';
            priceEl.classList.add('price--on-sale');
          } else {
            priceEl.classList.remove('price--on-sale');
          }
          priceEl.innerHTML = html;
        }

        setButtonState(submitEl, variant);
        setButtonState(stickySubmit, variant);

        if (variant && window.history.replaceState) {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', variant.id);
          window.history.replaceState({}, '', url.toString());
        }
      }

      picker.addEventListener('change', update);
      update();
    });
  }

  /* --- Boot ---------------------------------------------------------------- */

  function init() {
    initDrawer();
    initStickyAtc();
    initQuantity();
    initVariantPickers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
