/* ==========================================================================
   CartShare — room.js
   Main controller for room.html. Loads the current room, renders members /
   cart / activity, wires up form + button events, and listens for the
   browser "storage" event so other tabs in the same room update live.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = CartShareStorage.getCurrentUser();
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  let room = CartShareStorage.getRoom(currentUser.roomCode);
  if (!room) {
    // Room vanished (e.g. storage cleared) — send them back to log in again.
    CartShareStorage.clearCurrentUser();
    window.location.href = "index.html";
    return;
  }

  document.getElementById("roomCodeDisplay").textContent = room.code;
  document.getElementById("currentUserDisplay").textContent = `🙂 ${currentUser.name}`;

  function refresh() {
    const fresh = CartShareStorage.getRoom(currentUser.roomCode);
    if (!fresh) return;
    room = fresh;
    renderMembers(room);
    CartUI.renderCart(room, handleCartChange);
    ActivityUI.renderActivity(room);
  }

  function renderMembers(room) {
    document.getElementById("membersList").innerHTML = room.members
      .map(m => `<span class="member-chip">🟢 ${CartUI.escapeHtml(m)}</span>`)
      .join("");
    document.getElementById("memberCount").textContent = room.members.length;
  }

  function handleCartChange(id, action) {
    const item = room.items.find(i => i.id === id);
    if (!item) return;

    if (action === "inc") {
      item.qty += 1;
      CartShareStorage.addActivity(room, `${currentUser.name} set ${item.name} to ${item.qty}`);
    } else if (action === "dec") {
      if (item.qty <= 1) return;
      item.qty -= 1;
      CartShareStorage.addActivity(room, `${currentUser.name} set ${item.name} to ${item.qty}`);
    } else if (action === "remove") {
      room.items = room.items.filter(i => i.id !== id);
      CartShareStorage.addActivity(room, `${currentUser.name} removed ${item.name}`);
    }

    CartShareStorage.saveRoom(room);
    refresh();
  }

  document.getElementById("addItemForm").addEventListener("submit", e => {
    e.preventDefault();
    const nameField = document.getElementById("itemName");
    const qtyField = document.getElementById("itemQty");
    const priceField = document.getElementById("itemPrice");

    const name = nameField.value.trim();
    const qty = parseInt(qtyField.value, 10);
    const price = parseFloat(priceField.value);

    if (!name || !Number.isFinite(qty) || qty < 1 || !Number.isFinite(price) || price < 0) return;

    room.items.push({
      id: "it_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      qty,
      price,
      addedBy: currentUser.name
    });
    CartShareStorage.addActivity(room, `${currentUser.name} added ${name} × ${qty}`);
    CartShareStorage.saveRoom(room);

    nameField.value = "";
    qtyField.value = 1;
    priceField.value = "";
    nameField.focus();
    refresh();
  });

  document.getElementById("copyCodeBtn").addEventListener("click", () => {
    navigator.clipboard?.writeText(room.code);
    const btn = document.getElementById("copyCodeBtn");
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = original; }, 1400);
  });

  document.getElementById("receiptBtn").addEventListener("click", () => {
    window.location.href = "receipt.html";
  });

  document.getElementById("leaveBtn").addEventListener("click", () => {
    CartShareStorage.clearCurrentUser();
    window.location.href = "index.html";
  });

  // Cross-tab sync: fires in OTHER tabs whenever this room's localStorage
  // key changes in any tab — this is what makes "Rahul's browser" update
  // without a manual refresh, per the project brief.
  window.addEventListener("storage", event => {
    if (event.key === CartShareStorage.roomKey(room.code)) {
      refresh();
    }
  });

  refresh();
});