import {
  Box,
  Container,
} from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
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
    console.log("Sign up clicked");
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
        <LoginForm
          onEmailLogin={handleEmailLogin}
          onGoogleLogin={handleGoogleLogin}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSignUp}
        />
      </Container>
    </Box>
  );
};

export default Login;
