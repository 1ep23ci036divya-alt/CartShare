CartShare – Collaborative Shopping Application

1. Project Name

CartShare

CartShare is a collaborative shopping web application that allows a group of users to create or join a shared shopping room, manage a common shopping cart, track activities, and generate a printable receipt.

---

2. Problem Statement

In shared living or working environments such as student hostels, offices, or travel groups, coordinating common purchases can be difficult.

People often use WhatsApp messages, notes, or spreadsheets to share their shopping requirements. This can result in:

- Missed items
- Duplicate purchases
- Difficulty tracking who added an item
- Difficulty calculating the total amount
- Problems when splitting expenses

CartShare provides a single shared platform to make group shopping easier and more organized.

---

3. Features

User and Room Management

- Enter user name
- Create a new shopping room
- Generate a unique room code
- Join an existing room using the room code

Shared Shopping Cart

- Add items to the cart
- Specify quantity
- Add item price
- Remove items
- Calculate the total cart amount
- Display who added each item

Activity Log

The application maintains an activity log showing actions performed by users.

Example:

- Divya added Milk × 2
- Rahul added Bread × 1
- Priya added Eggs × 12

Collaboration

Users in the same room can see cart changes through browser-based synchronization.

Printable Receipt

The application generates a clean receipt containing:

- Room code
- Items
- Quantity
- Price
- Total amount
- User who added each item
- Date and time

Responsive Design

The application is designed to work on:

- Desktop computers
- Laptops
- Tablets
- Mobile phones

---

4. Technologies Used

- HTML5 – Structure of the web pages
- CSS3 – Styling and responsive design
- JavaScript – Application logic and interactions
- Bootstrap – Responsive UI components
- CSS Flexbox and Grid – Responsive layouts
- Browser localStorage – Storing cart data
- JavaScript Storage Events – Synchronizing changes between browser tabs

---

5. Project Structure

CartShare/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   └── room.css
│
├── js/
│   ├── login.js
│   ├── room.js
│   ├── cart.js
│   ├── activity.js
│   └── receipt.js
│
└── assets/
    ├── images/
    └── icons/

---

6. How to Run the Project

Method 1 – Using VS Code Live Server

1. Download or clone the CartShare project.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Open "index.html".
5. Right-click on "index.html".
6. Select Open with Live Server.
7. The application will open in your browser.

Method 2 – Open Directly

The "index.html" file can also be opened directly in a web browser if the project does not require a local server.

---

7. How to Create a Room

1. Open the CartShare application.
2. Enter your name.
3. Click Create Room.
4. The application generates a unique room code.
5. Share the room code with other participants.
6. Click Go to Room to open the shared shopping cart.

Example:

Room Code: ABC123

---

8. How to Join a Room

1. Open the CartShare application.
2. Enter your name.
3. Enter the room code received from another participant.
4. Click Join Room.
5. You will enter the shared shopping cart.

Example:

Name: Rahul
Room Code: ABC123

[ Join Room ]

---

9. How Collaboration Works

CartShare uses browser storage to maintain cart information.

When a user adds or removes an item:

1. The cart data is updated.
2. The updated information is stored in the browser.
3. JavaScript detects the storage change.
4. The cart interface is updated in the other browser tabs.

Example:

User 1
Divya adds Milk × 2
        ↓
Cart data updated
        ↓
Browser storage
        ↓
Storage event
        ↓
User 2 sees Milk × 2

This allows multiple browser sessions/tabs to simulate collaborative shopping.

---

10. Generating the Receipt

After completing the shopping list:

1. Open Generate Receipt.
2. Review the cart summary.
3. Check the total amount.
4. Click Print Receipt.
5. The application generates a clean printable receipt.

---

11. Future Enhancements

Possible future improvements include:

- User authentication
- Cloud database
- Real-time collaboration between different devices
- Online payment splitting
- Individual expense tracking
- Notifications
- Product search
- Cloud-based room storage

---

12. Conclusion

CartShare provides a simple collaborative solution for managing group shopping. It combines room-based collaboration, shared cart management, activity tracking, browser storage, responsive design, and printable receipts in a single web application.
