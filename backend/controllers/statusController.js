const statusModel = require("../models/statusModel");

exports.getStatus = (req, res) => {
  statusModel.getStatus(req.query.user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.uploadStatus = (req, res) => {
  const type = req.file.mimetype.startsWith("video") ? "video" : "image";
  const data = {
    user_id: req.body.user_id,
    file_url: `/uploads/${req.file.filename}`,
    type,
  };
  statusModel.createStatus(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true, file_url: data.file_url });
  });
};

exports.markSeen = (req, res) => {
  const { status_id, user_id } = req.body;
  statusModel.markSeen(status_id, user_id, () => {
    res.json({ success: true });
  });
};

exports.replyStatus = (req, res) => {
  statusModel.replyStatus(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
};
