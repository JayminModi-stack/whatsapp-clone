import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Status from "./pages/Status";

function App() {
  const [user, setUser] = useState(undefined);
  const [themeColor, setThemeColor] = useState("075e54");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTheme = localStorage.getItem("theme");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setThemeColor(storedTheme);
  }, []);

  if (user === undefined) return null;
  if (themeColor === undefined) return null;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Chat setUser={setUser} setThemeColor={setThemeColor} />
            ) : (
              <Login setUser={setUser} setThemeColor={setThemeColor} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Chat setUser={setUser} setThemeColor={setThemeColor} />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/chat"
          element={
            user ? (
              <Chat setUser={setUser} setThemeColor={setThemeColor} />
            ) : (
              <Login setUser={setUser} setThemeColor={setThemeColor} />
            )
          }
        />
        <Route
          path="/status"
          element={
            user ? (
              <Status setUser={setUser} setThemeColor={setThemeColor} />
            ) : (
              <Login setUser={setUser} setThemeColor={setThemeColor} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
