import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";

export default function ChatList({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    if (!currentUser?.id) return;
    api
      .get("/auth/users")
      .then((res) => {
        const filtered = res.data.filter((u) => u.id !== currentUser.id);
        setUsers(filtered);
      })
      .catch();
  }, [currentUser?.id]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        background: "#f0f2f5",
        borderRight: "1px solid #ddd",
      }}
    >
      <Typography
        sx={{ p: 2, fontWeight: "bold", fontSize: 18, background: "#ddd" }}
      >
        Chats
      </Typography>
      <Box sx={{ p: 1.5, background: "#f0f2f5" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ background: "white", borderRadius: 2 }}
        />
      </Box>
      <List sx={{ overflowY: "auto", flex: 1 }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ListItem
              button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              sx={{
                alignItems: "flex-start",
                px: 2,
                py: 1.2,
                borderBottom: "1px solid #eee",
                transition: "0.2s",
                "&:hover": { backgroundColor: "#ebebeb" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#075e54",
                    width: 45,
                    height: 45,
                    fontWeight: "bold",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight="600" fontSize={15}>
                      {user.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#667781", fontSize: 11 }}
                    >
                      {user.created_at
                        ? new Date(user.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#667781",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 200,
                      mt: 0.5,
                    }}
                  >
                    {user.last_message
                      ? user.type === "file"
                        ? "📎 File"
                        : user.last_message
                      : "No messages yet"}
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No users found..." />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
