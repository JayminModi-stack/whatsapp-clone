const db = require("../config/db");

exports.createUser = (name, mobile, password, cb) => {
  db.query(
    "INSERT INTO users(name,mobile,password) VALUES(?,?,?)",
    [name, mobile, password],
    cb,
  );
};

exports.findByMobile = (mobile, cb) => {
  db.query("SELECT * FROM users WHERE mobile=?", [mobile], cb);
};

exports.getUsers = (cb) => {
  db.query("SELECT id,name,mobile FROM users", cb);
};

exports.getUsersWithLastMessage = (currentUserId, cb) => {
  const sql = `
    SELECT 
      u.id,
      u.name,
      u.mobile,
      m.message AS last_message,
      m.type,
      m.created_at
    FROM users u
    LEFT JOIN messages m ON m.id = (
      SELECT id FROM messages 
      WHERE 
        (sender_id = u.id AND receiver_id = ?) OR 
        (sender_id = ? AND receiver_id = u.id)
      ORDER BY id DESC
      LIMIT 1
    )
    WHERE u.id != ?
    ORDER BY m.id DESC
  `;

  db.query(sql, [currentUserId, currentUserId, currentUserId], cb);
};
