import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Chip,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import { MdFavoriteBorder } from "react-icons/md";
import { LuBrain, LuPill } from "react-icons/lu";
import { Discovery } from "../data/types";

interface DiscoveryItemProps {
  discovery: Discovery;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  showCheckbox?: boolean;
}

const DiscoveryItem: React.FC<DiscoveryItemProps> = ({
  discovery,
  isSelected,
  onToggleSelect,
  showCheckbox = true,
}) => {
  const theme = useTheme();
  const dateStr = new Date(discovery.timestamp).toLocaleString();

  const getIconForType = (type: Discovery["type"]) => {
    switch (type) {
      case "physiology":
        return (
          <MdFavoriteBorder
            size={20}
            style={{ color: theme.palette.primary.main }}
          />
        );
      case "brain":
        return (
          <LuBrain size={20} style={{ color: theme.palette.error.light }} />
        );
      case "medication":
        return (
          <LuPill size={20} style={{ color: theme.palette.success.main }} />
        );
      default:
        return null;
    }
  };

  const getChipColor = (severity: Discovery["severity"]) => {
    switch (severity) {
      case "low":
        return "info";
      case "medium":
        return "warning";
      case "high":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => showCheckbox && onToggleSelect(discovery.id)}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 2,
          my: 1,
        }}
      >
        {/* Left Side: Icon, Title, Description */}
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "transparent", color: "inherit" }}>
            {getIconForType(discovery.type)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="bold">
              {discovery.title}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {discovery.description}
            </Typography>
          }
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        />
        {/* Right Side: Date/Time and Severity Chip */}
        <Box
          sx={{
            textAlign: { xs: "center", sm: "right" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-end" },
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {dateStr}
          </Typography>
          <Chip
            label={discovery.severity}
            color={getChipColor(discovery.severity)}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
        {/* Vertical Divider and Checkbox */}
        {showCheckbox && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderWidth: "1px", borderColor: "grey.300" }}
            />
            <Checkbox
              edge="end"
              checked={isSelected}
              tabIndex={-1}
              disableRipple
              sx={{ mr: 1 }}
            />
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default DiscoveryItem;
