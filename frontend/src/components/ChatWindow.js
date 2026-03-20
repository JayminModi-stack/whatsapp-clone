import { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MenuIcon from "@mui/icons-material/Menu";
import EmojiPicker from "./EmojiPicker";
import ChatDrawer from "./ChatDrawer";

export default function ChatWindow({ selectedUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const backgroundOptions = [
    "https://www.transparenttextures.com/patterns/cubes.png",
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=300",
    "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=300",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("chatBg");
    if (saved) setSelectedBackground(saved);
  }, []);

  const handleBackgroundChange = (url) => {
    setSelectedBackground(url);
    localStorage.setItem("chatBg", url);
  };

  useEffect(() => {
    if (!selectedUser) return;
    api
      .get(`/chat/${currentUser.id}/${selectedUser.id}`)
      .then((res) => setMessages(res.data));
  }, [selectedUser, currentUser.id]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (data) => {
      if (data.sender_id === selectedUser?.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser, socket]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const sendMessage = async () => {
    if (!message && !file) return;
    const formData = new FormData();
    formData.append("sender_id", currentUser.id);
    formData.append("receiver_id", selectedUser.id);
    formData.append("message", message);
    if (file) formData.append("file", file);
    const res = await api.post("/chat/send", formData);
    const data = {
      sender_id: currentUser.id,
      receiver_id: selectedUser.id,
      message,
      file_url: res.data.file_url,
      type: file ? "file" : "text",
    };
    socket.emit("sendMessage", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
    setFile(null);
    setPreview(null);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {selectedUser ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #ddd",
              background: "#f0f2f5",
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar sx={{ bgcolor: "#075e54" }}>
                {selectedUser.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography fontWeight="600">{selectedUser.name}</Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 2,
              py: 2,
              backgroundImage: selectedBackground
                ? `url(${selectedBackground})`
                : 'url("https://www.transparenttextures.com/patterns/cubes.png")',
              backgroundSize: "cover",
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender_id === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    background:
                      msg.sender_id === currentUser.id ? "#d9fdd3" : "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "60%",
                    boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "right",
                      color: "#667781",
                      fontSize: 10,
                      mt: 0.5,
                    }}
                  >
                    {msg.created_at
                      ? new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {preview && (
            <Box
              sx={{
                position: "relative",
                p: 1,
                background: "#f0f2f5",
                borderTop: "1px solid #ddd",
              }}
            >
              <IconButton
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  background: "white",
                }}
              >
                ❌
              </IconButton>
              {file?.type.startsWith("image") && (
                <img
                  src={preview}
                  alt="preview"
                  style={{ maxWidth: "200px", borderRadius: "10px" }}
                />
              )}
              {file?.type.startsWith("video") && (
                <video
                  src={preview}
                  controls
                  style={{ maxWidth: "220px", borderRadius: "10px" }}
                />
              )}
              {file &&
                !file.type.startsWith("image") &&
                !file.type.startsWith("video") && (
                  <Typography>{file.name}</Typography>
                )}
            </Box>
          )}
          {showEmoji && <EmojiPicker setMessage={setMessage} />}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1,
              py: 1,
              background: "#f0f2f5",
              borderTop: "1px solid #ddd",
            }}
          >
            <IconButton onClick={() => setShowEmoji(!showEmoji)}>
              <EmojiEmotionsIcon />
            </IconButton>
            <input
              type="file"
              hidden
              id="fileUpload"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
              }}
            />
            <label htmlFor="fileUpload">
              <IconButton component="span">📎</IconButton>
            </label>
            <TextField
              fullWidth
              size="small"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mx: 1, background: "white", borderRadius: 5 }}
            />
            <IconButton
              onClick={sendMessage}
              sx={{
                background: "#25D366",
                color: "white",
                "&:hover": { background: "#20b858" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box sx={{ m: "auto", textAlign: "center" }}>
          <Box
            component="img"
            src="/logo.png"
            sx={{ width: 150, height: 150 }}
          />
          <Typography variant="h6">Select a chat to start messaging</Typography>
        </Box>
      )}
      <ChatDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        selectedUser={selectedUser}
        backgroundOptions={backgroundOptions}
        selectedBackground={selectedBackground}
        onChangeBackground={handleBackgroundChange}
      />
    </Box>
  );
}
