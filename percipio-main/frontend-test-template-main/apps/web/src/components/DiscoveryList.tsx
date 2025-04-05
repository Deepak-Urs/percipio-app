import React from "react";
import { List, Box } from "@mui/material";
import { Discovery } from "../data/types";
import DiscoveryItem from "./DiscoveryItem";

interface DiscoveryListProps {
  discoveries?: Discovery[]; // Optional; defaults to empty array
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  showCheckbox?: boolean; // If false, checkboxes are hidden (for acknowledged list)
}

const DiscoveryList: React.FC<DiscoveryListProps> = ({
  discoveries = [],
  selectedIds,
  onToggleSelect,
  showCheckbox = true,
}) => {
  // Sort discoveries in reverse-chronological order (newest first)
  const sortedDiscoveries = [...discoveries].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        borderRadius: 2,
        p: 2,
      }}
    >
      <List disablePadding>
        {sortedDiscoveries.map((discovery) => (
          <DiscoveryItem
            key={discovery.id}
            discovery={discovery}
            isSelected={selectedIds.includes(discovery.id)}
            onToggleSelect={onToggleSelect}
            showCheckbox={showCheckbox}
          />
        ))}
      </List>
    </Box>
  );
};

export default DiscoveryList;
