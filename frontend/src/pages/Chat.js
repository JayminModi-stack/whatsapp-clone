import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Box } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import Header from "../components/Header";

export default function Chat({ setUser, setThemeColor }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    newSocket.emit("register", user.id);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  if (!socket) return <div>Loading...</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header setUser={setUser} setThemeColor={setThemeColor} />
      <Box sx={{ display: "flex", flex: 1 }}>
        <ChatList setSelectedUser={setSelectedUser} />
        <ChatWindow selectedUser={selectedUser} socket={socket} />
      </Box>
    </Box>
  );
}
