const express = require("express");
const router = express.Router();
const chat = require("../controllers/chatController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");

router.post("/send", authMiddleware, upload.single("file"), chat.sendMessage);
router.get("/:sender/:receiver", authMiddleware, chat.getMessages);

module.exports = router;
