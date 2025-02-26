"use client";

import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { saveMenuOrder } from "@/actions/saveMenuOrder";
import { useMenuStore } from "@/lib/store";

import MenuActions from "./MenuActions";
// import DragAndDropList from "../DragAndDropList";
import { Menu } from "@/types/menuTypes";
import toast from "react-hot-toast";
import DragAndDropList from "../dnd/DragAndDropList";

interface NaveListProps {
  data: Menu[]; // Replace 'any' with the appropriate type if known
}

export default function NaveList({ data }: NaveListProps) {
  const [menuItems, setMenuItems] = useState<Menu[]>(data);
  const [isEditMode, setIsEditMode] = useState(false);

  const mobileOpen = useMenuStore((stat) => stat.open);
  const setMobileOpen = useMenuStore((stat) => stat.setOpen);

  /** Toggles the drawer */
  const handleDrawerToggle = () => setMobileOpen(false);

  /** Saves new menu order */
  async function saveNewOrder() {
    try {
      const result = await saveMenuOrder(menuItems);

      if (
        typeof result === "object" &&
        result !== null &&
        "success" in result
      ) {
        if (result.success) {
          setIsEditMode(false); // Exit edit mode on success
          toast.success(result.message); // Show success message
        } else {
          toast.error(result.message); // Show error message
        }
      } else {
        toast.error("❌ Unexpected response from server.");
      }
    } catch (error) {
      console.error("❌ Failed to save order:", error);

      toast.error("❌ Something went wrong. Please try again.");
    }
  }

  /** Discards changes and restores the original menu */
  function discardChanges() {
    setMenuItems(data); // Revert to previous state before editing
    setIsEditMode(false);
  }

  return (
    <Box sx={{ mt: 8 }}>
      <List>
        {/* Header */}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ display: "flex", justifyContent: "space-between", py: 3 }}
          >
            <Box
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              onClick={handleDrawerToggle}
            >
              {mobileOpen && <ArrowBack />}
              <Typography sx={{ fontSize: "25px" }}>Menu</Typography>
            </Box>
            <MenuActions
              isEditMode={isEditMode}
              onToggleEditMode={() => setIsEditMode(!isEditMode)}
              onSave={saveNewOrder}
              onDiscard={discardChanges}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Draggable List */}
        <DragAndDropList
          isEditMode={isEditMode}
          menuItems={menuItems}
          setMenuItems={setMenuItems}
        />
      </List>
    </Box>
  );
}
