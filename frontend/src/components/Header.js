import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaletteIcon from "@mui/icons-material/Palette";
import { useNavigate } from "react-router-dom";
import colors from "../theme/colors";

export default function Header({ setUser, setThemeColor }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [themeAnchor, setThemeAnchor] = useState(null);
  const currentTheme = localStorage.getItem("theme") || "#075e54";
  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);
  const openTheme = (e) => setThemeAnchor(e.currentTarget);
  const closeTheme = () => setThemeAnchor(null);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleThemeChange = (color) => {
    localStorage.setItem("theme", color);
    setThemeColor(color);
    closeTheme();
  };

  return (
    <AppBar position="static" sx={{ background: currentTheme }}>
      <Toolbar>
        <Avatar sx={{ mr: 2, cursor: "pointer" }} onClick={() => navigate("/")}>
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>
        <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
          {user?.name || "User"}
        </Typography>
        <IconButton color="inherit" onClick={openTheme}>
          <PaletteIcon />
        </IconButton>
        <IconButton color="inherit" onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={themeAnchor}
          open={Boolean(themeAnchor)}
          onClose={closeTheme}
        >
          {Object.entries(colors).map(([key, value]) => (
            <MenuItem key={key} onClick={() => handleThemeChange(value)}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  background: value,
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              {key}
            </MenuItem>
          ))}
        </Menu>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              navigate("/status");
            }}
          >
            Status
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
