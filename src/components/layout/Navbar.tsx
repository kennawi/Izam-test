"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import SearchInput from "../jobs/SearchInput";
import {
  Home as HomeIcon,
  Work,
  Business,
  Notifications,
  Message,
  AccountCircle,
} from "@mui/icons-material";
import { Divider } from "@mui/material";

export default function Navbar() {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#161616", zIndex: theme.zIndex.drawer + 1, px: 7 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }} gap={5.75}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontSize: "35px", fontWeight: 700 }}
          >
            i<span style={{ color: "#3D8E41" }}>Z</span>AM
          </Typography>
          <SearchInput />
        </Box>
        <Box sx={{ display: { md: "flex", xs: "none" }, gap: 2 }}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <Work />
          </IconButton>
          <IconButton color="inherit">
            <Business />
          </IconButton>
          <Divider orientation="vertical" sx={{ color: "white" }} />
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Message />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
