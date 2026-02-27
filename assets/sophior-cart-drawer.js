/* ============================================================
   SOPHIOR — Cart Drawer JS
   Gebruikt door snippets/sophior-cart-drawer.liquid
   ============================================================ */

(function () {
  'use strict';

  const THRESHOLD = 5900; // €59 in centen
  const DRAWER_ID = 'sophior-cart-drawer';

  /* ---- DOM refs ---- */
  const drawer = document.getElementById(DRAWER_ID);
  if (!drawer) return;

  const panel = drawer.querySelector('.sophior-cart-drawer__panel');
  const body = drawer.querySelector('#sophior-cart-body');
  const footer = drawer.querySelector('#sophior-cart-footer');
  const progressWrap = drawer.querySelector('#sophior-cart-progress');
  const totals = drawer.querySelector('#sophior-cart-totals');
  const subtotalPrice = drawer.querySelector('.sophior-cart-drawer__subtotal-price');

  /* ---- Open / Close ---- */
  function openCart() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sophior-cart-open');
    // Focus eerste interactief element in panel
    const firstFocusable = panel.querySelector('button, [href], input');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeCart() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sophior-cart-open');
    // Focus terug naar cart icon in header
    const cartIcon = document.getElementById('sophior-cart-btn');
    if (cartIcon) cartIcon.focus();
  }

  /* ---- Event listeners ---- */
  // Open via custom event (vanuit header cart icon)
  document.addEventListener('sophior:open-cart', openCart);

  // Close via backdrop of close-knop
  drawer.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'close-cart') closeCart();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeCart();
    }
  });

  // Trap focus in panel
  panel.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = panel.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---- Cart API helpers ---- */
  function fetchCart() {
    return fetch('/cart.js', { headers: { 'Content-Type': 'application/json' } })
      .then(function (r) { return r.json(); });
  }

  function changeQty(key, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity }),
    }).then(function (r) { return r.json(); });
  }

  /* ---- Render helpers ---- */
  function formatMoney(cents) {
    return '€\u00a0' + (cents / 100).toFixed(2).replace('.', ',');
  }

  function updateProgress(totalPrice) {
    if (!progressWrap) return;
    const remaining = THRESHOLD - totalPrice;
    const pct = Math.min(Math.round((totalPrice / THRESHOLD) * 100), 100);
    const fill = progressWrap.querySelector('.sophior-cart-drawer__progress-fill');
    const text = progressWrap.querySelector('.sophior-cart-drawer__progress-text');
    if (fill) {
      fill.style.width = pct + '%';
      fill.setAttribute('aria-valuenow', pct);
    }
    if (text) {
      if (remaining > 0) {
        text.className = 'sophior-cart-drawer__progress-text';
        text.textContent = 'Nog ' + formatMoney(remaining) + ' tot gratis verzending!';
      } else {
        text.className = 'sophior-cart-drawer__progress-text sophior-cart-drawer__progress-text--achieved';
        text.textContent = 'Je hebt gratis verzending!';
      }
    }
  }

  function updateCartCount(count) {
    // Werk cart count badge bij in header
    let badge = document.querySelector('.sophior-header__cart-count');
    const cartBtn = document.getElementById('sophior-cart-btn');
    if (count > 0) {
      if (!badge && cartBtn) {
        badge = document.createElement('span');
        badge.className = 'sophior-header__cart-count';
        cartBtn.appendChild(badge);
      }
      if (badge) badge.textContent = count;
    } else {
      if (badge) badge.remove();
    }
  }

  function renderItems(cart) {
    if (!body) return;
    if (cart.item_count === 0) {
      body.innerHTML = [
        '<div class="sophior-cart-drawer__empty">',
        '<svg viewBox="0 0 24 24" aria-hidden="true" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">',
        '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>',
        '<line x1="3" y1="6" x2="21" y2="6"/>',
        '<path d="M16 10a4 4 0 0 1-8 0"/>',
        '</svg>',
        '<p>Je winkelwagen is leeg.</p>',
        '<a href="/collections/all" class="sophior-cart-drawer__shop-link">Bekijk ons assortiment</a>',
        '</div>',
      ].join('');
      // Verberg footer
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = '';

    const items = cart.items.map(function (item) {
      const imgHtml = item.image
        ? '<img src="' + item.image + '" class="sophior-cart-drawer__item-img" alt="" loading="lazy" width="80" height="100">'
        : '<div class="sophior-cart-drawer__item-img sophior-cart-drawer__item-img--placeholder"></div>';

      const variantHtml = item.variant_title && item.variant_title !== 'Default Title'
        ? '<p class="sophior-cart-drawer__item-variant">' + escapeHtml(item.variant_title) + '</p>'
        : '';

      const compareHtml = item.original_line_price !== item.final_line_price
        ? '<s class="sophior-cart-drawer__item-price--compare">' + formatMoney(item.original_line_price) + '</s>'
        : '';

      const removesAttr = item.quantity === 1 ? ' data-removes="true"' : '';

      return [
        '<li class="sophior-cart-drawer__item" data-key="' + item.key + '" data-variant-id="' + item.variant_id + '">',
        '  <a href="' + item.url + '" class="sophior-cart-drawer__item-img-link" tabindex="-1" aria-hidden="true">' + imgHtml + '</a>',
        '  <div class="sophior-cart-drawer__item-info">',
        '    <a href="' + item.url + '" class="sophior-cart-drawer__item-title">' + escapeHtml(item.product_title) + '</a>',
        variantHtml,
        '    <div class="sophior-cart-drawer__item-bottom">',
        '      <div class="sophior-cart-drawer__qty" role="group">',
        '        <button class="sophior-cart-drawer__qty-btn" type="button" data-action="decrease-qty" data-key="' + item.key + '"' + removesAttr + ' aria-label="Minder">−</button>',
        '        <span class="sophior-cart-drawer__qty-num" aria-live="polite">' + item.quantity + '</span>',
        '        <button class="sophior-cart-drawer__qty-btn" type="button" data-action="increase-qty" data-key="' + item.key + '" aria-label="Meer">+</button>',
        '      </div>',
        '      <div class="sophior-cart-drawer__item-price">' + formatMoney(item.final_line_price) + compareHtml + '</div>',
        '    </div>',
        '  </div>',
        '  <button class="sophior-cart-drawer__item-remove" type="button" data-action="remove-item" data-key="' + item.key + '" aria-label="Verwijder ' + escapeHtml(item.product_title) + '">',
        '    <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        '  </button>',
        '</li>',
      ].join('');
    });

    body.innerHTML = '<ul class="sophior-cart-drawer__items" id="sophior-cart-items" role="list">' + items.join('') + '</ul>';
  }

  function renderTotals(cart) {
    if (totals) {
      if (subtotalPrice) {
        subtotalPrice.textContent = formatMoney(cart.total_price);
      }
    }
    updateProgress(cart.total_price);
    updateCartCount(cart.item_count);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---- Qty / Remove actions ---- */
  drawer.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const key = btn.dataset.key;

    if (action === 'increase-qty') {
      const item = drawer.querySelector('[data-key="' + key + '"]');
      if (!item) return;
      item.classList.add('is-loading');
      const qtyEl = item.querySelector('.sophior-cart-drawer__qty-num');
      const currentQty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      changeQty(key, currentQty + 1)
        .then(function (cart) {
          renderItems(cart);
          renderTotals(cart);
        })
        .catch(function () {
          item.classList.remove('is-loading');
        });
    }

    if (action === 'decrease-qty') {
      const item = drawer.querySelector('[data-key="' + key + '"]');
      if (!item) return;
      item.classList.add('is-loading');
      const qtyEl = item.querySelector('.sophior-cart-drawer__qty-num');
      const currentQty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      const newQty = currentQty - 1;
      changeQty(key, newQty)
        .then(function (cart) {
          renderItems(cart);
          renderTotals(cart);
        })
        .catch(function () {
          item.classList.remove('is-loading');
        });
    }

    if (action === 'remove-item') {
      const item = drawer.querySelector('[data-key="' + key + '"]');
      if (item) item.classList.add('is-loading');
      changeQty(key, 0)
        .then(function (cart) {
          renderItems(cart);
          renderTotals(cart);
        });
    }
  });

  /* ---- Luister naar cart-updates van andere scripts (bijv. quick-add) ---- */
  // Wanneer sophior-collection.js een product toevoegt, dispatch het 'sophior:cart-updated'
  document.addEventListener('sophior:cart-updated', function () {
    fetchCart().then(function (cart) {
      renderItems(cart);
      renderTotals(cart);
      openCart();
    });
  });

  // Dawn PubSub cart:update event
  if (window.subscribe) {
    window.subscribe(window.PUB_SUB_EVENTS && window.PUB_SUB_EVENTS.cartUpdate, function () {
      fetchCart().then(function (cart) {
        renderTotals(cart);
      });
    });
  }
})();
