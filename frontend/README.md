## Frontend Folder Structure
```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── api/
│   │   └── axios.js      
│   │
│   ├── components/
│   │   ├── ChatDrawer.js
│   │   ├── ChatList.js
│   │   ├── ChatWindow.js
│   │   ├── EmojiPicker.js
│   │   ├── Header.js
│   │   ├── MessageBox.js
│   │   └── StatusViewer.js
│   │
│   ├── pages/
│   │   ├── Chat.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Status.js
│   │
│   ├── theme/
│   │   └── colors.js
│   │
│   ├── utils/
│   │   └── auth.js
│   │
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── styles.css
│
├── .env
├── package.json
└── README.md
```

# WhatsApp Clone (React + Node.js + Socket.IO)

A real-time chat application inspired by **WhatsApp Web**, built using **React, Node.js, Express, MySQL, and Socket.IO**.

This project demonstrates how to build a modern messaging system with real-time communication, file sharing, and media previews.

---

# Features

* User Registration & Login
* Real-time messaging using Socket.IO
* Send and receive messages instantly
* Image, video, audio, and file upload
* Emoji picker support
* Delete message (Delete for me / Delete for everyone)
* Message timestamps
* Chat UI similar to WhatsApp Web
* Responsive design

---

# Tech Stack

## Frontend

* React
* Material UI
* Axios
* Socket.IO Client

---

# Installation

## 1. Clone Repository

git clone https://github.com/yourusername/whatsapp-clone.git

cd whatsapp-clone

---

# Frontend Setup

cd frontend

npm install

Create `.env` file

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_UPLOAD_URL=http://localhost:5000

Start frontend

npm start

# Future Improvements

* Online / Offline status
* Typing indicator
* Read receipts (double tick)
* Voice messages
* Message reactions
* Push notifications

---

# License

This project is for educational purposes only.
