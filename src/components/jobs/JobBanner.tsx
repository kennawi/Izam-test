import { Box, Card, Switch, Typography } from "@mui/material";
import React from "react";

export default function JobBanner() {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        bgcolor: "success.main",
        p: "10px",
        borderRadius: 1,
        color: "white",
        height: { xs: "57px", md: "auto" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { md: "23px", sx: "14px" },
          }}
        >
          UI Designer in Egypt
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            fontSize: { md: "17px", sx: "11px" },
          }}
        >
          70 job positions
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",

          alignItems: "baseline",
          gap: 1,
        }}
      >
        <Typography variant="body2">Set alert</Typography>
        <Switch color="default" />
      </Box>
    </Card>
  );
}
