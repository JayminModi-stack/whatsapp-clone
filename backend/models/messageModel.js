const db = require("../config/db");

exports.saveMessage = (data, callback) => {
  const sql = `INSERT INTO messages (sender_id, receiver_id, message, file_url, type) VALUES (?,?,?,?,?)`;
  db.query(
    sql,
    [data.sender_id, data.receiver_id, data.message, data.file_url, data.type],
    callback,
  );
};

exports.getMessages = (sender, receiver, callback) => {
  const sql = `SELECT * FROM messages WHERE (sender_id=? AND receiver_id=?) OR (sender_id=? AND receiver_id=?) ORDER BY created_at ASC`;
  db.query(sql, [sender, receiver, receiver, sender], callback);
};
