import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  AccountBalance as AccountIcon,
  TrendingUp as TrendingIcon,
  Psychology as AIIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDemoMode } from '../contexts/DemoModeContext';

const Demo: React.FC = () => {
  const navigate = useNavigate();
  const { isDemo, setDemoMode } = useDemoMode();

  useEffect(() => {
    // Ensure demo mode is active when visiting this page
    if (!isDemo) {
      setDemoMode(true);
      // Reload to initialize demo database
      window.location.reload();
    }
  }, [isDemo, setDemoMode]);

  const features = [
    {
      icon: <AccountIcon />,
      title: '収支管理',
      description: '収入・支出を簡単に記録し、カテゴリ別に管理',
    },
    {
      icon: <TrendingIcon />,
      title: 'トレンド分析',
      description: '月別の収支推移をグラフで可視化',
    },
    {
      icon: <AIIcon />,
      title: 'AIフィードバック',
      description: 'AIが収支パターンを分析し、改善提案を提供',
    },
    {
      icon: <CategoryIcon />,
      title: 'カテゴリ管理',
      description: '支出カテゴリを自由にカスタマイズ',
    },
  ];

  const demoData = [
    '平野家の家計簿（サンプル組織）',
    '2024年1月の収支データ',
    '食費、交通費、家賃などのカテゴリ',
    'AIによる支出分析と改善提案',
    '月次トレンドグラフ',
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Mielをデモで体験
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            実際のデータを使わずに、すべての機能を自由にお試しいただけます
          </Typography>
        </Box>

        {/* Demo Status */}
        <Alert severity="success" sx={{ fontSize: '1rem' }}>
          デモモードが有効です。サンプルデータを使用して機能をお試しください。
        </Alert>

        {/* Features */}
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" mb={3}>
            利用可能な機能
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 2 }}>
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Demo Data */}
        <Paper elevation={1} sx={{ p: 4, bgcolor: 'background.subtle' }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" mb={3}>
            サンプルデータ
          </Typography>
          <List>
            {demoData.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* CTA */}
        <Box textAlign="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{ px: 4, py: 1.5 }}
            >
              デモを開始
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
              sx={{ px: 4, py: 1.5 }}
            >
              ホームに戻る
            </Button>
          </Stack>
        </Box>

        {/* Notice */}
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            ※ デモモードで作成したデータは保存されません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ※ いつでも実際のデータモードに切り替え可能です
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Demo;