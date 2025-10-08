import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";

interface SignUpFormProps {
  onSignUpSuccess?: () => void;
  onBackToLogin?: () => void;
}

const SignUpForm = ({ onSignUpSuccess, onBackToLogin }: SignUpFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [email, setEmail] = useState<string>("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const emailValue = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      setLoading(false);
      return;
    }

    try {
      const { isSignUpComplete } = await signUp({
        username: emailValue,
        password: password,
        options: {
          userAttributes: {
            email: emailValue,
          },
        },
      });

      setEmail(emailValue);

      if (!isSignUpComplete) {
        setStep("confirm");
        setSuccess("確認コードをメールアドレスに送信しました。");
      } else {
        onSignUpSuccess?.();
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      
      switch (error.name) {
        case "UsernameExistsException":
          setError("このメールアドレスは既に登録されています。");
          break;
        case "InvalidPasswordException":
          setError("パスワードが要件を満たしていません。8文字以上で、英数字を含む必要があります。");
          break;
        default:
          setError("アカウント作成に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const confirmationCode = formData.get("confirmationCode") as string;

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      if (isSignUpComplete) {
        setSuccess("アカウントが正常に作成されました！ログインページに移動します。");
        setTimeout(() => {
          onSignUpSuccess?.();
        }, 2000);
      }
    } catch (error: any) {
      console.error("Confirm sign up error:", error);
      
      switch (error.name) {
        case "CodeMismatchException":
          setError("確認コードが間違っています。");
          break;
        case "ExpiredCodeException":
          setError("確認コードが期限切れです。新しいコードを請求してください。");
          break;
        default:
          setError("確認に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === "confirm") {
    return (
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              確認コード入力
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {email} に送信された確認コードを入力してください
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleConfirmSignUp}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="確認コード"
                name="confirmationCode"
                type="text"
                variant="outlined"
                placeholder="6桁のコードを入力"
                required
                disabled={loading}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ py: 1.5, color: "white" }}
              >
                {loading ? "確認中..." : "確認"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Link
                  href="#"
                  variant="body2"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onBackToLogin?.();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  ログインページに戻る
                </Link>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ width: "100%", maxWidth: 400 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Miel
          </Typography>
          <Typography variant="body1" color="text.secondary">
            新規アカウント作成
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignUp}>
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
              placeholder="8文字以上の英数字"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="パスワード確認"
              name="confirmPassword"
              type="password"
              variant="outlined"
              placeholder="パスワードを再入力"
              required
              disabled={loading}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, color: "white" }}
            >
              {loading ? "作成中..." : "アカウント作成"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                既にアカウントをお持ちの方は{" "}
                <Link
                  href="#"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onBackToLogin?.();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  ログイン
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;