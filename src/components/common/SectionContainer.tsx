import { Paper, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionContainerProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const SectionContainer = ({ title, description, icon, children }: SectionContainerProps) => {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          {icon && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              {icon}
            </Box>
          )}
          <Typography variant="h6">
            {title}
          </Typography>
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ ml: icon ? 4 : 0 }}>
            {description}
          </Typography>
        )}
      </Box>
      {children}
    </Paper>
  );
};

export default SectionContainer;