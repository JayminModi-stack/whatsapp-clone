import { Box, Typography } from "@mui/material";

export default function MessageBox({
  message,
  file_url,
  type,
  me,
  created_at,
}) {
  const APIUpload = process.env.REACT_APP_UPLOAD_URL;
  const url = file_url ? `${APIUpload}${file_url}` : null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: me ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          background: me ? "#dcf8c6" : "#fff",
          px: 2,
          py: 1.2,
          borderRadius: 2,
          maxWidth: "60%",
          boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <Typography variant="body2">{message}</Typography>
        {type === "image" && (
          <Box>
            <img
              src={url}
              alt={message || "chat image"}
              style={{ width: "200px", borderRadius: "8px" }}
            />
          </Box>
        )}
        {type === "video" && (
          <video
            src={url}
            controls
            style={{ width: "220px", borderRadius: "8px" }}
          />
        )}
        {type === "audio" && (
          <audio src={url} controls style={{ width: "220px" }} />
        )}
        {type === "file" && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: 500,
            }}
          >
            📎 Download File
          </a>
        )}
        {created_at && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "right",
              mt: 0.5,
              color: "#666",
              fontSize: "10px",
            }}
          >
            {new Date(created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
