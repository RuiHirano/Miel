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
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

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
  const handleEmailLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onEmailLogin?.(email, password);
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
            />
            <TextField
              fullWidth
              label="パスワード"
              name="password"
              type="password"
              variant="outlined"
              placeholder="パスワードを入力"
              required
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ py: 1.5 }}
            >
              ログイン
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