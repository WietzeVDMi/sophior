/**
 * sophior-collection.js
 * Quick-add functionaliteit voor sophior-product-card op de collection-pagina.
 * Event delegation op het product-grid — werkt ook na AJAX filtering.
 */
(function () {
  function attachQuickAdd(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.sophior-product-card__quick-add');
      if (!btn) return;

      var variantId = btn.dataset.productId;
      if (!variantId || btn.disabled) return;

      var originalText = btn.textContent.trim();

      btn.textContent = btn.dataset.adding || '...';
      btn.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          btn.textContent = btn.dataset.added || '✓';
          document.dispatchEvent(new CustomEvent('cart:refresh'));
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        })
        .catch(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        });
    });
  }

  var grid = document.getElementById('product-grid');
  if (grid) attachQuickAdd(grid);
})();
