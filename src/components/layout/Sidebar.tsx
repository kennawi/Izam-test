"use client";
import { useMenuStore } from "@/lib/store";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const drawerWidth = 440;
import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  const mobileOpen = useMenuStore((stat) => stat.open);
  const setMobileOpen = useMenuStore((stat) => stat.setOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isMobile ? "100%" : 440,
          boxSizing: "border-box",
        },
      }}
    >
      {children}
    </Drawer>
  );
}
