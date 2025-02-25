"use client";
import { IconButton, Paper } from "@mui/material";
import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useMenuStore } from "@/lib/store";

export default function MobileAction() {
  const mobileOpen = useMenuStore((stat) => stat.open);
  const setMobileOpen = useMenuStore((stat) => stat.setOpen);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Paper
      onClick={handleDrawerToggle}
      sx={{
        height: "57px",
        display: { md: "none", xs: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
      variant="outlined"
    >
      <IconButton
        onClick={handleDrawerToggle}
        disableRipple
        color="inherit"
        sx={{
          display: { md: "none" },
          width: "57px",
          height: "57px",
        }}
      >
        <MenuIcon sx={{ width: "24px", height: "24px" }} />
      </IconButton>
    </Paper>
  );
}
