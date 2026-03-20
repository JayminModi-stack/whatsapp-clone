import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, { mobile, password });
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/chat");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ece5dd",
      }}
    >
      <Box
        sx={{
          width: 350,
          background: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Mobile"
          fullWidth
          margin="normal"
          onChange={(e) => setMobile(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={login}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
