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

# Installation

## 1. Clone Repository

git clone https://github.com/yourusername/whatsapp-clone.git

cd whatsapp-clone

## 2. Frontend Setup

cd frontend

npm install

Create `.env` file

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_UPLOAD_URL=http://localhost:5000

Start frontend

npm start

---

## Backend Folder Structure

```
backend/
│
├── config/
│   ├── db.js
│   └── jwt.js
│
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   └── statusController.js
│
├── middleware/
│   ├── auth.js
│   └── upload.js
│
├── migrations/
│   ├── 20260319135646-create-users.js
│   ├── 20260319135654-create-messages.js
│   ├── 20260319135659-create-blocked-users.js
│   ├── 20260319135707-create-status.js
│   └── 20260319135715-create-status-views.js
│
├── models/
│   ├── messageModel.js
│   ├── statusModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   └── statusRoutes.js
│
├── seeders/
│   └── 20260319135722-demo-users.js
│
├── uploads/
│
├── .env
├── server.js
└── package.json
```
# Installation

## 1. Clone Repository

git clone https://github.com/yourusername/whatsapp-clone.git

cd whatsapp-clone

## 2. Backend Setup

cd backend

npm install

Create `.env` file

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=

DB_NAME=whatsapp_clone

JWT_SECRET=super_secret_key

Start server

npm start

## 3. Run Migration
* npx sequelize-cli db:migrate

## 4. Run Seeder
* npx sequelize-cli db:seed:all

---

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

## Backend

* Node.js
* Express.js
* MySQL
* Socket.IO
* Multer (file uploads)

---

# Future Improvements

* Online / Offline status
* Typing indicator
* Read receipts (double tick)
* Voice messages
* Message reactions
* Push notifications

---

# Database

Create MySQL database:

# CREATE DATABASE whatsapp_clone;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_users`
--

CREATE TABLE `blocked_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `blocked_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `type` enum('text','image','video','audio','file','status_reply') DEFAULT 'text',
  `deleted_for_me` tinyint(1) DEFAULT 0,
  `deleted_for_all` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status_views`
--

CREATE TABLE `status_views` (
  `id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked_users`
--
ALTER TABLE `blocked_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status_views`
--
ALTER TABLE `status_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked_users`
--
ALTER TABLE `blocked_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status_views`
--
ALTER TABLE `status_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;



---

# License

This project is for educational purposes only.
