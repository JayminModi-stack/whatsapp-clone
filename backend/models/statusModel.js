const db = require("../config/db");

exports.getStatus = (userId, callback) => {
  const sql = `SELECT s.*, u.name FROM status s JOIN users u ON s.user_id=u.id WHERE s.created_at > NOW() - INTERVAL 1 DAY ORDER BY s.created_at DESC`;
  db.query(sql, callback);
};

exports.createStatus = (data, callback) => {
  const sql = `INSERT INTO status (user_id,file_url,type) VALUES (?,?,?)`;
  db.query(sql, [data.user_id, data.file_url, data.type], callback);
};

exports.markSeen = (status_id, user_id, callback) => {
  const sql = `INSERT INTO status_views (status_id,user_id) VALUES (?,?)`;
  db.query(sql, [status_id, user_id], callback);
};

exports.getStatus = (user_id, callback) => {
  const sql = `SELECT s.*, u.name, COUNT(DISTINCT sv.user_id) as view_count, IF(EXISTS(SELECT 1 FROM status_views WHERE status_id=s.id AND user_id=?),1,0) as seen FROM status s JOIN users u ON u.id=s.user_id LEFT JOIN status_views sv ON sv.status_id=s.id WHERE s.created_at > NOW() - INTERVAL 1 DAY GROUP BY s.id ORDER BY s.created_at DESC`;
  db.query(sql, [user_id], callback);
};

exports.replyStatus = (data, callback) => {
  const sql = `INSERT INTO messages (sender_id, receiver_id, message, type) VALUES (?,?,?, 'status_reply')`;
  db.query(sql, [data.sender_id, data.receiver_id, data.message], callback);
};
