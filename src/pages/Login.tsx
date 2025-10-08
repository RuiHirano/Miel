import {
  Box,
  Container,
} from "@mui/material";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleEmailLogin = (email: string, password: string) => {
    console.log("Email login:", { email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignUp = () => {
    setMode("signup");
  };

  const handleSignUpSuccess = () => {
    setMode("login");
  };

  const handleBackToLogin = () => {
    setMode("login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.subtle",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
        {mode === "login" ? (
          <LoginForm
            onEmailLogin={handleEmailLogin}
            onGoogleLogin={handleGoogleLogin}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleSignUp}
          />
        ) : (
          <SignUpForm
            onSignUpSuccess={handleSignUpSuccess}
            onBackToLogin={handleBackToLogin}
          />
        )}
      </Container>
    </Box>
  );
};

export default Login;
