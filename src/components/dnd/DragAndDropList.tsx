"use client";
import React, { useState } from "react";
import { Box, Collapse } from "@mui/material";
import { trackMenuOrder } from "@/actions/trackMenuOrder";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { Menu } from "@/types/menuTypes";
import DndContainer from "./DndContainer";
import NavItem from "../navigation/NavItem";
import toast from "react-hot-toast";

interface DragAndDropListProps {
  menuItems: Menu[];
  setMenuItems: React.Dispatch<React.SetStateAction<Menu[]>>;
  isEditMode: boolean;
}

export default function DragAndDropList({
  menuItems,
  setMenuItems,
  isEditMode,
}: DragAndDropListProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  /** Toggles the collapse state of an item */
  const toggleItemExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle only the clicked item
    }));
  };

  /** Updates the title of an item */
  const handleTitleEdit = (
    itemId: string,
    newTitle: string,
    parentId?: string
  ) => {
    if (parentId) {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === parentId
            ? {
                ...item,
                children: item.children?.map((child) =>
                  child.id === itemId ? { ...child, title: newTitle } : child
                ),
              }
            : item
        )
      );
    } else {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, title: newTitle } : item
        )
      );
    }
    // setEditingId(null);
  };

  /** Toggles visibility of an item */
  const toggleVisibility = (itemId: string, parentId?: string) => {
    if (parentId) {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === parentId
            ? {
                ...item,
                children: item.children?.map((child) =>
                  child.id === itemId
                    ? { ...child, visible: !child.visible }
                    : child
                ),
              }
            : item
        )
      );
    } else {
      setMenuItems((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, visible: !item.visible } : item
        )
      );
    }
  };

  /** Handles drag & drop reordering */
  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setMenuItems((prevUsersList) => {
      let updatedList = [...prevUsersList];

      // Helper function to reorder items
      const reorderItems = (list: Menu[], activeId: string, overId: string) => {
        const oldIndex = list.findIndex((item) => item.id === activeId);
        const newIndex = list.findIndex((item) => item.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(list, oldIndex, newIndex);
        }
        return list;
      };

      // Check if dragged item is in root or children
      const isRootItem = updatedList.some((item) => item.id === active.id);

      if (isRootItem) {
        updatedList = reorderItems(
          updatedList,
          active.id as string,
          over.id as string
        );
      } else {
        // Look into children of each root item
        updatedList = updatedList.map((parent) => {
          if (parent.children) {
            return {
              ...parent,
              children: reorderItems(
                parent.children,
                active.id as string,
                over.id as string
              ),
            };
          }
          return parent;
        });
      }

      return updatedList;
    });
    try {
      const result = await trackMenuOrder(
        active.id.toString(),
        active.id.toString(),
        over.id.toString()
      );

      if (
        typeof result === "object" &&
        result !== null &&
        "success" in result
      ) {
        if (result.success) {
          // Exit edit mode on success
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

  return (
    <DndContainer
      onDragEnd={onDragEnd}
      menuItems={menuItems}
      renderItem={(item) => (
        <NavItem
          handleTitleEdit={handleTitleEdit}
          toggleVisibility={toggleVisibility}
          isEditMode={isEditMode}
          key={item.id}
          item={item}
          itHasChildren={!!item.children && item.children.length > 0}
          open={!!expandedItems[item.id]}
          onClick={() => toggleItemExpand(item.id)}
        >
          <Collapse key={item.id} in={!!expandedItems[item.id]} timeout="auto">
            {item.children && (
              <Box pl={2}>
                <DndContainer
                  onDragEnd={onDragEnd}
                  menuItems={item.children}
                  renderItem={(child) => (
                    <NavItem
                      handleTitleEdit={handleTitleEdit}
                      toggleVisibility={toggleVisibility}
                      isEditMode={isEditMode}
                      parentId={item.id}
                      key={child.id}
                      item={child}
                    />
                  )}
                />
              </Box>
            )}
          </Collapse>
        </NavItem>
      )}
    />
  );
}
