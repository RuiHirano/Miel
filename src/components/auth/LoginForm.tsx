import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Link,
  Alert,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";

interface LoginFormProps {
  onEmailLogin?: (email: string, password: string) => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

const LoginForm = ({
  onEmailLogin,
  onGoogleLogin,
  onForgotPassword,
  onSignUp,
}: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
      });

      if (isSignedIn) {
        // Redirect to dashboard or call success callback
        onEmailLogin?.(email, password);
        window.location.href = "/dashboard";
      } else {
        // Handle next step (e.g., email confirmation, MFA)
        console.log("Next step:", nextStep);
        setError("サインインに追加のステップが必要です。");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      
      // Handle different error types
      switch (error.name) {
        case "UserNotConfirmedException":
          setError("アカウントの確認が必要です。メールをご確認ください。");
          break;
        case "NotAuthorizedException":
          setError("メールアドレスまたはパスワードが間違っています。");
          break;
        case "UserNotFoundException":
          setError("このメールアドレスのアカウントが見つかりません。");
          break;
        default:
          setError("ログインに失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400 }}>
      <CardContent sx={{ p: 4 }}>
        {/* ヘッダー */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Miel
          </Typography>
          <Typography variant="body1" color="text.secondary">
            アカウントにログイン
          </Typography>
        </Box>

        {/* エラーメッセージ */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* ログインフォーム */}
        <Box component="form" onSubmit={handleEmailLogin}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="メールアドレス"
              name="email"
              type="email"
              variant="outlined"
              placeholder="example@email.com"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="パスワード"
              name="password"
              type="password"
              variant="outlined"
              placeholder="パスワードを入力"
              required
              disabled={loading}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ 
                py: 1.5,
                color: "white"
              }}
            >
              {loading ? "ログイン中..." : "ログイン"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link
                href="#"
                variant="body2"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onForgotPassword?.();
                }}
                sx={{ cursor: "pointer" }}
              >
                パスワードを忘れた方はこちら
              </Link>
            </Box>

            <Divider>または</Divider>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={onGoogleLogin}
              sx={{ py: 1.5 }}
            >
              Googleでログイン
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                アカウントをお持ちでない方は{" "}
                <Link
                  href="#"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onSignUp?.();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  新規登録
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;