/* ==========================================================================
   CartShare — receipt.js
   Builds a read-only, printable summary of the current room's cart.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = CartShareStorage.getCurrentUser();
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  const room = CartShareStorage.getRoom(currentUser.roomCode);
  if (!room) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("receiptRoomCode").textContent = room.code;
  document.getElementById("receiptDate").textContent = new Date().toLocaleDateString("en-GB");

  const tbody = document.getElementById("receiptBody");
  room.items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${CartUI.escapeHtml(item.name)}</td>
      <td class="text-center">${item.qty}</td>
      <td class="text-end">${CartUI.formatMoney(CartUI.calcItemTotal(item))}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("receiptTotal").textContent = CartUI.formatMoney(CartUI.calcCartTotal(room.items));

  const addedByMap = {};
  room.items.forEach(item => {
    (addedByMap[item.addedBy] ??= []).push(item.name);
  });

  const addedByEl = document.getElementById("addedByList");
  const names = Object.keys(addedByMap);
  if (names.length === 0) {
    addedByEl.innerHTML = `<li class="text-ink-soft">No items added yet.</li>`;
  } else {
    addedByEl.innerHTML = names
      .map(name => `<li>${CartUI.escapeHtml(name)} — ${CartUI.escapeHtml(addedByMap[name].join(", "))}</li>`)
      .join("");
  }

  document.getElementById("printBtn").addEventListener("click", () => window.print());
  document.getElementById("backBtn").addEventListener("click", () => { window.location.href = "room.html"; });
});