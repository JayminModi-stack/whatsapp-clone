import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";

export default function ChatDrawer({
  open,
  onClose,
  selectedUser,
  backgroundOptions,
  selectedBackground,
  onChangeBackground,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);

  useEffect(() => {
    if (open) {
      setTabValue(0);
      setSubTabValue(0);
    }
  }, [open]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, bgcolor: "background.paper" }}>
        <Box
          sx={{ p: 3, bgcolor: "#075e54", color: "white", textAlign: "center" }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 1.5,
              bgcolor: "#128C7E",
            }}
          >
            {selectedUser?.name?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            {selectedUser?.name || "User"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Active now
          </Typography>
        </Box>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab label="Media" />
          <Tab label="Options" />
        </Tabs>
        {tabValue === 0 && (
          <>
            <Tabs
              value={subTabValue}
              onChange={(_, v) => setSubTabValue(v)}
              centered
            >
              <Tab label="Images" />
              <Tab label="Videos" />
              <Tab label="Files" />
              <Tab label="Audio" />
              <Tab label="Text" />
            </Tabs>
            <Box sx={{ p: 3 }}>
              <Typography>
                {["Images", "Videos", "Files", "Audio", "Text"][subTabValue]}
              </Typography>
            </Box>
          </>
        )}
        {tabValue === 1 && (
          <>
            <Tabs
              value={subTabValue}
              onChange={(_, v) => setSubTabValue(v)}
              centered
            >
              <Tab label="Customize" />
              <Tab label="Manage" />
            </Tabs>
            {subTabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Typography fontWeight="bold" gutterBottom>
                  CHANGE BACKGROUND
                </Typography>
                <Grid container spacing={1}>
                  {backgroundOptions.map((url, i) => (
                    <Grid item xs={4} key={i}>
                      <Box
                        component="img"
                        src={url}
                        alt="bg"
                        onClick={() => onChangeBackground(url)}
                        sx={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          cursor: "pointer",
                          border:
                            selectedBackground === url
                              ? "3px solid #075e54"
                              : "2px solid transparent",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {subTabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Typography sx={{ mb: 1 }}>🚫 Block</Typography>
                <Typography>⚠️ Report</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
}
