import { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const register = async () => {
    await axios.post(`${API}/auth/register`, { name, mobile, password });
    alert("Registered");
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
        <Typography variant="h5">Register</Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={register}>
          Register
        </Button>
      </Box>
    </Box>
  );
}
