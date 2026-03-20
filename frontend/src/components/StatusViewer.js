import { Box, Typography, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function StatusViewer({ statuses = [], onClose }) {
  const API = process.env.REACT_APP_UPLOAD_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reply, setReply] = useState("");
  const status = statuses[index];

  const nextStatus = useCallback(() => {
    if (index < statuses.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  }, [index, statuses.length, onClose]);

  const prevStatus = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!status) return;
    api.post("/status/seen", {
      status_id: status.id,
      user_id: user?.id,
    });
  }, [status, user.id]);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => p + 2);
    }, 100);
    const timer = setTimeout(() => {
      nextStatus();
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [index, paused, nextStatus]);

  const handlers = useSwipeable({
    onSwipedLeft: nextStatus,
    onSwipedRight: prevStatus,
    trackMouse: true,
  });
  const handleMouseDown = () => setPaused(true);
  const handleMouseUp = () => setPaused(false);

  const handleClick = (e) => {
    const width = window.innerWidth;
    if (e.clientX < width / 2) {
      prevStatus();
    } else {
      nextStatus();
    }
  };

  const sendReply = async () => {
    if (!reply || !status) return;
    await api.post("/status/reply", {
      status_id: status.id,
      sender_id: user?.id,
      receiver_id: status.user_id,
      message: reply,
    });
    setReply("");
  };
  if (!status) return null;

  return (
    <Box
      {...handlers}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          display: "flex",
          gap: 1,
        }}
      >
        {statuses.map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 3,
              background:
                i < index
                  ? "#fff"
                  : i === index
                    ? `linear-gradient(to right,#fff ${progress}%,rgba(255,255,255,0.3) ${progress}%)`
                    : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 30,
          left: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "white",
        }}
      >
        <Avatar>{status.name?.charAt(0)}</Avatar>
        <Typography>{status.name}</Typography>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {status.type === "image" && (
          <img
            src={`${API}${status.file_url}`}
            alt="status"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        )}
        {status.type === "video" && (
          <video
            src={`${API}${status.file_url}`}
            autoPlay
            controls
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
      </motion.div>
      <Typography
        sx={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "white",
        }}
      >
        👁 {status.view_count || 0}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          size="small"
          fullWidth
          placeholder="Reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          sx={{ background: "white", borderRadius: 2 }}
        />
        <IconButton sx={{ color: "white" }} onClick={sendReply}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
