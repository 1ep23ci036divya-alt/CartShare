/* ==========================================================================
   CartShare — login.js  (index.html)
   Handles the create-room / join-room tab toggle and form submission.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("userName");
  const codeInput = document.getElementById("roomCode");
  const joinCodeGroup = document.getElementById("joinCodeGroup");
  const tabCreate = document.getElementById("tabCreate");
  const tabJoin = document.getElementById("tabJoin");
  const createBtn = document.getElementById("createRoomBtn");
  const joinBtn = document.getElementById("joinRoomBtn");
  const errorMsg = document.getElementById("errorMsg");

  let mode = "create";

  function setMode(next) {
    mode = next;
    const creating = mode === "create";
    tabCreate.classList.toggle("active", creating);
    tabJoin.classList.toggle("active", !creating);
    joinCodeGroup.classList.toggle("d-none", creating);
    createBtn.classList.toggle("d-none", !creating);
    joinBtn.classList.toggle("d-none", creating);
    hideError();
  }

  tabCreate.addEventListener("click", () => setMode("create"));
  tabJoin.addEventListener("click", () => setMode("join"));

  createBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) return showError("Please enter your name.");

    const room = CartShareStorage.createRoom(name);
    CartShareStorage.setCurrentUser({ name, roomCode: room.code });
    window.location.href = "room.html";
  });

  joinBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const code = codeInput.value.trim().toUpperCase();
    if (!name) return showError("Please enter your name.");
    if (!code) return showError("Please enter a room code.");

    const room = CartShareStorage.joinRoom(code, name);
    if (!room) return showError(`No room found with code ${code}.`);

    CartShareStorage.setCurrentUser({ name, roomCode: room.code });
    window.location.href = "room.html";
  });

  codeInput?.addEventListener("input", () => {
    codeInput.value = codeInput.value.toUpperCase();
  });

  [nameInput, codeInput].forEach(el => {
    el?.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        mode === "create" ? createBtn.click() : joinBtn.click();
      }
    });
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove("d-none");
  }
  function hideError() {
    errorMsg.classList.add("d-none");
  }
});