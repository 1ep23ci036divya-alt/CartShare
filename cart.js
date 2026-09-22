/* ==========================================================================
   CartShare — cart.js
   Renders the cart table and handles per-item totals. Exposes CartUI,
   used by room.js (live editing) and receipt.js (read-only summary).
   ========================================================================== */

const CartUI = (() => {
  function calcItemTotal(item) {
    return item.qty * item.price;
  }

  function calcCartTotal(items) {
    return items.reduce((sum, i) => sum + calcItemTotal(i), 0);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  function formatMoney(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
  }

  function renderCart(room, onChange) {
    const tbody = document.getElementById("cartBody");
    const emptyMsg = document.getElementById("emptyCartMsg");
    tbody.innerHTML = "";

    if (room.items.length === 0) {
      emptyMsg?.classList.remove("d-none");
    } else {
      emptyMsg?.classList.add("d-none");
    }

    room.items.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHtml(item.name)}</td>
        <td>
          <div class="qty-control">
            <button type="button" class="btn-qty" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.qty}</span>
            <button type="button" class="btn-qty" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </td>
        <td>${formatMoney(item.price)}</td>
        <td class="fw-700">${formatMoney(calcItemTotal(item))}</td>
        <td><span class="badge-added">${escapeHtml(item.addedBy)}</span></td>
        <td><button type="button" class="btn-remove" data-action="remove" data-id="${item.id}" aria-label="Remove item">🗑️</button></td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById("cartTotal").textContent = formatMoney(calcCartTotal(room.items));

    tbody.querySelectorAll("button[data-action]").forEach(btn => {
      btn.addEventListener("click", () => onChange(btn.dataset.id, btn.dataset.action));
    });
  }

  return { renderCart, calcItemTotal, calcCartTotal, escapeHtml, formatMoney };
})();