const router = require("express").Router();
const status = require("../controllers/statusController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, status.getStatus);
router.post("/upload", authMiddleware, upload.single("file"), status.uploadStatus);
router.post("/seen", authMiddleware, status.markSeen);
router.post("/reply", authMiddleware, status.replyStatus);

module.exports = router;
