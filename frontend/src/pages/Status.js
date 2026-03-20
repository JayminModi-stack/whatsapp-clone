import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatusViewer from "../components/StatusViewer";
import Header from "../components/Header";
import api from "../api/axios";

export default function Status({ setUser, setThemeColor }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [statuses, setStatuses] = useState([]);
  const [viewer, setViewer] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const fetchStatuses = useCallback(async () => {
    try {
      const res = await api.get(`/status?user_id=${user.id}`);
      setStatuses(res.data);
    } catch (err) {
      alert(err);
    }
  }, [user.id]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const openStatus = (status) => {
    const userStatuses = statuses.filter((s) => s.user_id === status.user_id);
    setSelectedStatuses(userStatuses);
    setViewer(true);
  };

  const uploadStatus = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("user_id", user.id);
    await api.post("/status/upload", form);
    fetchStatuses();
  };

  return (
    <Box sx={{ height: "100vh", background: "#f0f2f5" }}>
      <Header setUser={setUser} setThemeColor={setThemeColor} />
      <Box sx={{ p: 2 }}>
        <List>
          <ListItem
            sx={{ cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#25d366" }}>
                {user?.name?.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="My Status"
              secondary="Tap to add status update"
            />
          </ListItem>
        </List>
        <Typography sx={{ mt: 2, mb: 1, color: "gray", fontSize: 14 }}>
          Recent Updates
        </Typography>
        <List>
          {statuses.map((status) => (
            <ListItem
              key={status.id}
              onClick={() => openStatus(status)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    border: status.seen
                      ? "3px solid gray"
                      : "3px solid #25d366",
                  }}
                >
                  {status.name?.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={status.name} secondary="Tap to view" />
            </ListItem>
          ))}
        </List>
      </Box>
      <Fab
        sx={{ position: "fixed", bottom: 25, right: 25, background: "#25d366" }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <AddIcon />
      </Fab>
      <input
        id="fileInput"
        type="file"
        hidden
        accept="image/*,video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) uploadStatus(file);
        }}
      />
      {viewer && (
        <StatusViewer
          statuses={selectedStatuses}
          onClose={() => {
            setViewer(false);
            fetchStatuses();
          }}
        />
      )}
    </Box>
  );
}
