import {
  Add as AddIcon,
  Business as BusinessIcon,
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { mockOrganizations } from "../../domains/organization/mock";

interface OrganizationSelectorProps {
  variant?: "dark" | "light";
}

const OrganizationSelector = ({
  variant = "dark",
}: OrganizationSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrg, setSelectedOrg] = useState(mockOrganizations[0]);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrgSelect = (orgId: string) => {
    const org = mockOrganizations.find((o) => o.id === orgId);
    if (org) {
      setSelectedOrg(org);
    }
    handleClose();
  };

  const getOrgIcon = (orgName: string) => {
    if (orgName.includes("家")) return <HomeIcon fontSize="small" />;
    if (orgName.includes("個人")) return <PersonIcon fontSize="small" />;
    return <BusinessIcon fontSize="small" />;
  };

  const isDark = variant === "dark";

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{
          color: isDark ? "inherit" : "text.primary",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.05)",
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(0, 0, 0, 0.1)",
          },
          borderRadius: 2,
          px: 2,
          py: 1,
          textTransform: "none",
          minWidth: 200,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {getOrgIcon(selectedOrg.name)}
          <Typography variant="body1">{selectedOrg.name}</Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            minWidth: 250,
          },
        }}
      >
        <MenuItem disabled>
          <Typography variant="caption" color="text.secondary">
            組織を選択
          </Typography>
        </MenuItem>

        {mockOrganizations.map((org) => (
          <MenuItem
            key={org.id}
            onClick={() => handleOrgSelect(org.id)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                {getOrgIcon(org.name)}
              </ListItemIcon>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={selectedOrg.id === org.id ? "medium" : "regular"}
                >
                  {org.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {org.description}
                </Typography>
              </Box>
            </Box>
            {selectedOrg.id === org.id && (
              <CheckIcon fontSize="small" color="primary" />
            )}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          sx={{
            py: 1.5,
            color: "primary.main",
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <AddIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">新しい組織を作成</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default OrganizationSelector;
