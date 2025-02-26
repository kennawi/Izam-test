import * as React from "react";
import { Box, Stack } from "@mui/material";
import SortBy from "@/components/jobs/SortBy";
import JobList from "@/components/jobs/JobList";
import JobBanner from "@/components/jobs/JobBanner";
import MobileAction from "@/components/jobs/MobileAction";

export default async function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        bgcolor: "#F7F7F7",
      }}
    >
      <Box sx={{ p: 3, mt: 8 }}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <SortBy />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <JobBanner />
            <MobileAction />
          </Box>
          <JobList />
        </Stack>
      </Box>
    </Box>
  );
}
