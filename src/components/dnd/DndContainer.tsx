import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { JSX } from "react";

import { Stack } from "@mui/material";
import { Menu } from "@/types/menuTypes";

interface DndContainerProps {
  menuItems: Menu[];
  onDragEnd: (event: DragEndEvent) => void;
  renderItem: (item: Menu) => JSX.Element;
}

export default function DndContainer({
  menuItems,
  onDragEnd,
  renderItem,
}: DndContainerProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={menuItems} strategy={verticalListSortingStrategy}>
        <Stack sx={{ px: 2, mt: 1 }} spacing={1}>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
}
