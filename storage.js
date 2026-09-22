/* ==========================================================================
   CartShare — storage.js
   Shared helpers for reading/writing room data (localStorage) and the
   current tab's identity (sessionStorage). Every other script relies on
   this file, so it must be loaded first.
   ========================================================================== */

const CartShareStorage = (() => {
  const ROOM_PREFIX = "cartshare_room_";
  const USER_KEY = "cartshare_currentUser";
  const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

  function roomKey(code) {
    return ROOM_PREFIX + code.toUpperCase();
  }

  function generateRoomCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
    }
    return code;
  }

  function roomExists(code) {
    return localStorage.getItem(roomKey(code)) !== null;
  }

  function getRoom(code) {
    const raw = localStorage.getItem(roomKey(code));
    return raw ? JSON.parse(raw) : null;
  }

  function saveRoom(room) {
    localStorage.setItem(roomKey(room.code), JSON.stringify(room));
  }

  function addActivity(room, text) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    room.activity.unshift({ time, text });
    if (room.activity.length > 60) room.activity.length = 60;
  }

  function createRoom(hostName) {
    let code;
    do { code = generateRoomCode(); } while (roomExists(code));
    const room = {
      code,
      members: [hostName],
      items: [],
      activity: [],
      createdAt: new Date().toISOString()
    };
    addActivity(room, `${hostName} created the room`);
    saveRoom(room);
    return room;
  }

  function joinRoom(code, name) {
    const room = getRoom(code);
    if (!room) return null;
    if (!room.members.includes(name)) {
      room.members.push(name);
      addActivity(room, `${name} joined the room`);
      saveRoom(room);
    }
    return room;
  }

  function getCurrentUser() {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function setCurrentUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function clearCurrentUser() {
    sessionStorage.removeItem(USER_KEY);
  }

  return {
    roomKey, generateRoomCode, roomExists, getRoom, saveRoom, addActivity,
    createRoom, joinRoom, getCurrentUser, setCurrentUser, clearCurrentUser
  };
})();