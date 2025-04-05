import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Typography,
  Divider,
  Stack,
  Tabs,
  Tab,
  Box,
  CircularProgress,
} from "@mui/material";
import DiscoveryList from "./DiscoveryList";
import { Discovery } from "../data/types";
import { generateDiscoveries } from "../data/data";

const LOCAL_STORAGE_KEY = "acknowledgedDiscoveries";

const DiscoveriesSection: React.FC = () => {
  const [allDiscoveries] = useState<Discovery[]>(generateDiscoveries());
  const [acknowledged, setAcknowledged] = useState<Discovery[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(25);
  const [loading, setLoading] = useState<boolean>(false);

  // Load stored acknowldged discoveries on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setAcknowledged(JSON.parse(stored));
  }, []);

  // Toggle selection for a discovery (adds or removes id)
  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Filter active discoveries that are not acknowldged
  const activeDiscoveries = allDiscoveries.filter(
    (d) => !acknowledged.some((ack) => ack.id === d.id)
  );

  // Submit selected discoveries and persist them
  const handleSubmit = () => {
    const toAcknowledge = activeDiscoveries.filter((d) =>
      selectedIds.includes(d.id)
    );
    const updatedAcknowledged = [...acknowledged, ...toAcknowledge];
    setAcknowledged(updatedAcknowledged);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAcknowledged));
    setSelectedIds([]);
  };

  // Reset function to clear persisting data and reset states
  const handleReset = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY); // clear storage
    setAcknowledged([]);
    setSelectedIds([]);
    setVisibleCount(25);
  };

  // Handle tab switching (active vs. acknowldged)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSelectedIds([]); // clear selection on tab swtich
  };

  const isActiveTab = activeTab === 0;
  const displayedDiscoveries = isActiveTab ? activeDiscoveries : acknowledged;
  const tabLabelActive = `ACTIVE [${activeDiscoveries.length}]`;
  const tabLabelAck = `ACKNOWLEDGED [${acknowledged.length}]`;
  const subheadingText = isActiveTab
    ? `Displaying ${activeDiscoveries.length} active discoveries`
    : `Displaying ${acknowledged.length} acknowledged discoveries`;

  // Infinite scroll logic - load more items if near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      if (
        window.innerHeight + window.scrollY >= scrollHeight - 500 &&
        visibleCount < activeDiscoveries.length &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(prev + 25, activeDiscoveries.length)
          );
          setLoading(false);
        }, 500);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeDiscoveries.length, visibleCount, loading]);

  return (
    <Container sx={{ backgroundColor: "white", p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Discoveries</Typography>
        <Typography variant="body2" color="text.secondary">
          {subheadingText}
        </Typography>
        {/* Tabs with Submit and Reset buttons grouped together */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={tabLabelActive} />
            <Tab label={tabLabelAck} />
          </Tabs>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            {isActiveTab && (
              <Button
                variant="contained"
                color="primary"
                disabled={selectedIds.length === 0}
                onClick={handleSubmit}
              >
                SUBMIT
              </Button>
            )}
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              RESET
            </Button>
          </Box>
        </Box>
        <Divider />
        <DiscoveryList
          discoveries={
            isActiveTab
              ? activeDiscoveries.slice(0, visibleCount)
              : displayedDiscoveries
          }
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          showCheckbox={isActiveTab}
        />
        {isActiveTab && loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default DiscoveriesSection;
