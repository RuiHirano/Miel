import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const Login = () => {
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
      <Container maxWidth="sm">
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
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="メールアドレス"
                type="email"
                variant="outlined"
                placeholder="example@email.com"
              />
              <TextField
                fullWidth
                label="パスワード"
                type="password"
                variant="outlined"
                placeholder="パスワードを入力"
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5 }}
              >
                ログイン
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Link href="#" variant="body2" color="primary">
                  パスワードを忘れた方はこちら
                </Link>
              </Box>

              <Divider>または</Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                sx={{ py: 1.5 }}
              >
                Googleでログイン
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  アカウントをお持ちでない方は{" "}
                  <Link href="#" color="primary">
                    新規登録
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
