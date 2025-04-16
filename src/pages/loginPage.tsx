import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { DEV_AUTH_TOKEN, ID_TOKEN } from "../utils/devAuthToken";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email format");
      setOpen(true);
      return;
    }

    try {
      // 👉 使用開發模式 Token
      if (DEV_AUTH_TOKEN && ID_TOKEN) {
        console.log("🔧 Using DEV token");
        localStorage.setItem("token", ID_TOKEN); // idToken
        localStorage.setItem("accessToken", DEV_AUTH_TOKEN); // accessToken
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      // 👉 真實 Cognito 登入流程
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      console.log("✅ Login Response:", data);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("accessToken", data.accessToken);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      setError(err.message || "Login failed");
      setOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      {/* error toast */}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="error" onClose={() => setOpen(false)}>
          {error}
        </Alert>
      </Snackbar>

      {/* success toast */}
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success">
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
