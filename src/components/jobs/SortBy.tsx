"use client";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiSelect-select": {
    color: theme.palette.success.main,
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: theme.palette.success.main,
  },
}));

interface SortChangeEvent {
  target: {
    value: string;
  };
}
export default function SortBy() {
  const [sortBy, setSortBy] = React.useState("top-match");

  const handleSortChange = (event: SortChangeEvent) => {
    setSortBy(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography color="text.secondary">Sorting by :</Typography>
      <StyledFormControl size="small">
        <Select
          value={sortBy}
          onChange={handleSortChange}
          IconComponent={KeyboardArrowDown}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="top-match">Top match</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
        </Select>
      </StyledFormControl>
    </Box>
  );
}
