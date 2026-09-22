/* ==========================================================================
   CartShare — activity.js
   Renders the real-time activity feed shown on room.html.
   ========================================================================== */

const ActivityUI = (() => {
  function renderActivity(room) {
    const list = document.getElementById("activityList");
    list.innerHTML = "";

    if (!room.activity || room.activity.length === 0) {
      list.innerHTML = `<li class="activity-empty">No activity yet — add an item to get started.</li>`;
      return;
    }

    room.activity.forEach(entry => {
      const li = document.createElement("li");
      li.className = "activity-item";
      li.innerHTML = `
        <span class="activity-time">${CartUI.escapeHtml(entry.time)}</span>
        <span class="activity-text">${CartUI.escapeHtml(entry.text)}</span>
      `;
      list.appendChild(li);
    });
  }

  return { renderActivity };
})();