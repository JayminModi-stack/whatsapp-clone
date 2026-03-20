const messageModel = require("../models/messageModel");

exports.sendMessage = (req, res) => {
  const data = {
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    message: req.body.message || null,
    file_url: req.file ? `/uploads/${req.file.filename}` : null,
    type: req.file ? "file" : "text",
  };
  messageModel.saveMessage(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true, id: result.insertId, file_url: data.file_url });
  });
};

exports.getMessages = (req, res) => {
  const { sender, receiver } = req.params;
  messageModel.getMessages(sender, receiver, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
