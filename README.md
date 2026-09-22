# 🛒 CartShare

A collaborative shopping-cart app for roommates, hostel groups, and anyone who's
tired of tracking a grocery order across forty WhatsApp messages. Create a
Room, share the code, and watch everyone's items — and the bill — build up
live.

Built for the "CartShare" project brief with vanilla **HTML, CSS, JavaScript
and Bootstrap 5**, using **browser storage** for persistence and cross-tab
sync (no backend required).

---

## Features

- **Create / Join Room** — enter a name, create a room to get a unique
  6-character code, or join an existing room with a code.
- **Shared shopping cart** — add items with quantity and price, adjust
  quantity with `+` / `−`, remove items, see a live running total and who
  added each item.
- **Real-time activity log** — a timestamped feed of every add / remove /
  quantity change in the room.
- **Cross-tab sync** — changes made in one browser tab appear automatically
  in every other tab open on the same room, using the `storage` event
  (no manual refresh needed).
- **Printable receipt** — a clean, itemized summary with a total and a
  per-person "added by" breakdown, ready to print or save as PDF.
- **Responsive UI** — built with Flexbox, CSS Grid and Bootstrap so it works
  on both mobile and desktop.

---

## How it works (technical notes)

- **Data persistence**: each room is stored in `localStorage` under
  `cartshare_room_<CODE>` as a JSON object (`code`, `members`, `items`,
  `activity`, `createdAt`).
- **Identity**: your name for the current tab is stored in `sessionStorage`
  (not `localStorage`) on purpose — this lets you open several tabs in the
  *same* browser, sign each one in as a different roommate, and simulate
  multiple users in one room for testing/demoing, while the room's cart data
  itself lives in shared `localStorage` and stays in sync everywhere.
- **Live sync**: `room.html` listens for the browser's native `storage`
  event, which fires in every other tab whenever `localStorage` changes.
  When it fires for the current room's key, the page re-renders the cart,
  members and activity log — this is the "multi-tab collaboration" required
  by the brief, implemented with no server.
- **Printing**: `receipt.html` uses a `@media print` rule to hide navigation
  buttons and print only the receipt sheet.

> **Note on "real-time":** this implementation follows the brief's
> specification exactly — collaboration via `localStorage` + the `storage`
> event, which syncs across tabs/windows of the *same browser*. It's the
> right scope for this syllabus-level project. A production version with
> true cross-device, cross-network real-time sync would need a backend
> (API + database + WebSockets or similar), as noted in the original
> project brief.

---

## Project structure

```
CartShare/
│
├── index.html          # Create / Join room
├── room.html            # Shared cart + activity log
├── receipt.html          # Printable receipt
├── README.md
│
├── css/
│   ├── style.css        # Shared theme (neon lime + baby pink)
│   ├── login.css
│   ├── room.css
│   └── receipt.css
│
├── js/
│   ├── storage.js        # localStorage / sessionStorage helpers
│   ├── login.js          # index.html logic
│   ├── cart.js           # cart rendering + calculations
│   ├── activity.js       # activity log rendering
│   ├── room.js            # room.html controller + storage-event sync
│   └── receipt.js        # receipt.html logic
│
└── assets/
    ├── icons/
    └── images/
```

---

## Running it locally

No build step or server is required.

1. Download / clone this folder.
2. Open `index.html` directly in a browser, **or** serve it locally for a
   cleaner experience:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Create a room, then open `index.html` in a **second tab** and join with
   the same room code under a different name to see live sync in action.

## Deployment

Deploy as a static site on any of the following (no environment variables
or backend needed):

- **Vercel** — `vercel deploy` from the project folder, or import the repo
  in the Vercel dashboard.
- **Netlify** — drag-and-drop the folder onto Netlify, or connect the repo.
- **GitHub Pages** — push to a repo and enable Pages on the `main` branch
  (root directory).

Because sync relies on `localStorage`, test the "Room" functionality across
multiple tabs of the **same browser on the same device** — that's the
scope described in the brief.

---

## Submission checklist

- [x] User name / login
- [x] Create room
- [x] Join room using code
- [x] Unique room code
- [x] Add item
- [x] Remove item
- [x] Quantity controls
- [x] Price calculation
- [x] Shared cart
- [x] Activity log
- [x] Browser storage persistence
- [x] Multi-tab synchronization
- [x] Responsive UI (mobile + desktop)
- [x] Printable receipt
- [ ] GitHub repository — push this folder and link it
- [ ] Live deployment — deploy and submit the URL

Submit your project link using the naming convention:
`BatchID_FullName_CartShare`