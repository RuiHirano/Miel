import { Paper, Typography, Box, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { ReactNode, useState, useRef, useEffect } from 'react';

interface SectionContainerProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxHeight?: number; // Maximum height before showing "Show more" button
  expandable?: boolean; // Whether the section can be expanded
}

const SectionContainer = ({ 
  title, 
  description, 
  icon, 
  children, 
  maxHeight = 600, 
  expandable = false 
}: SectionContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandable && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setShowExpandButton(contentHeight > maxHeight);
    }
  }, [children, maxHeight, expandable]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
      
      <Box
        ref={contentRef}
        sx={{
          maxHeight: expandable && !isExpanded && showExpandButton ? maxHeight : 'none',
          overflow: 'hidden',
          position: 'relative',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {children}
        
        {/* Gradient overlay when collapsed */}
        {expandable && !isExpanded && showExpandButton && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))',
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>
      
      {/* Show more/less button */}
      {expandable && showExpandButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={handleToggleExpand}
            endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            size="small"
            variant="text"
          >
            {isExpanded ? '閉じる' : 'もっと見る'}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default SectionContainer;