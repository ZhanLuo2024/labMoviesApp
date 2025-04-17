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
import axios from "axios";
import { jwtDecode } from "jwt-decode";


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
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/auth/signin`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { idToken, accessToken, refreshToken } = res.data;

      // 儲存 Token 到 localStorage
      localStorage.setItem("token", idToken);
      console.log(idToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Optional：也可以記錄使用者 email
      localStorage.setItem("userEmail", email);

      // decode idToken 取得使用者 ID
      const decoded: any = jwtDecode(idToken);
      localStorage.setItem("userId", decoded.sub);

      // 顯示成功訊息並跳轉首頁
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);

    } catch (err: any) {
      console.error("❌ Login Error:", err);
      setError(err.response?.data?.error || "Login failed");
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

      {/* Error toast */}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="error" onClose={() => setOpen(false)}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success toast */}
      <Snackbar open={success} autoHideDuration={2000}>
        <Alert severity="success">
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
