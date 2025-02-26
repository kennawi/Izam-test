"use client";
import { useSortable } from "@dnd-kit/sortable";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";

import {
  DragIndicator,
  ExpandLess,
  ExpandMore,
  ModeEditOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "@/types/menuTypes";

interface ItemNavProps {
  item: Menu;
  children?: React.ReactNode;
  onClick?: () => void;
  itHasChildren?: boolean;
  open?: boolean;
  isEditMode: boolean;
  handleTitleEdit: (id: string, title: string, parentId: string) => void;
  parentId?: string;
  toggleVisibility: (id: string, parentId: string) => void;
}

export default function NavItem({
  item,
  children,
  onClick,
  itHasChildren,
  open,
  isEditMode,
  handleTitleEdit,
  parentId,
  toggleVisibility,
}: ItemNavProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: item?.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: !!item.visible && !isEditMode ? "none" : "",
        width: "100%", // Ensure the width is set properly
        height: "auto", // Preserve aspect ratio
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1, // Optional: Reduce opacity while dragging
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
      key={item?.id}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 2,
            alignItems: "center",
            bgcolor: children ? "#F7F7F7" : "white",
          }}
          onClick={onClick}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isEditMode && (
              <DragIndicator
                sx={{ opacity: !!item.visible ? 0.5 : 1, cursor: "grab" }}
                {...attributes}
                {...listeners}
              />
            )}
            {editingId === item.id ? (
              <TextField
                sx={{
                  opacity: item.visible ? 1 : 0.5,
                }}
                fullWidth
                defaultValue={item.title}
                // value={item.title}
                onChange={(e) =>
                  handleTitleEdit(item.id, e.target.value, parentId || "")
                }
                onBlur={() => setEditingId(null)}
                autoFocus
              />
            ) : (
              <>
                {!isEditMode ? (
                  <Link
                    style={{ width: "100%" }}
                    href={itHasChildren ? "" : (item.target as string)}
                  >
                    <Typography
                      sx={{
                        opacity: !!item.visible ? 0.5 : 1,
                        fontSize: "25px",
                        color: "#404040",
                        "&:hover": { color: "#2f7d31" },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    sx={{
                      opacity: !!item.visible ? 0.5 : 1,
                      fontSize: "25px",
                      color: "#404040",
                    }}
                  >
                    {item.title}
                  </Typography>
                )}
              </>
            )}
          </Box>
          {isEditMode ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ModeEditOutlineOutlined onClick={() => setEditingId(item.id)} />
              <IconButton
                size="small"
                onClick={() => toggleVisibility(item.id, parentId || "")}
              >
                {!!item.visible ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </Box>
          ) : (
            <>
              {itHasChildren && <>{open ? <ExpandLess /> : <ExpandMore />}</>}
            </>
          )}
        </ListItemButton>
        {/* </Link> */}
      </ListItem>
      {children && (
        <List component="div" disablePadding>
          {children}
        </List>
      )}
    </div>
  );
}
