import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
  Settings,
} from "@mui/icons-material";
import { Box } from "@mui/material";

interface MenuActionsProps {
  isEditMode: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onToggleEditMode: () => void;
}

export default function MenuActions({
  isEditMode,
  onSave,
  onDiscard,
  onToggleEditMode,
}: MenuActionsProps) {
  return (
    <Box>
      {isEditMode ? (
        <>
          <CancelOutlined
            sx={{ width: "42px", height: "42px" }}
            color="error"
            onClick={onDiscard}
          />
          <CheckCircleOutlineOutlined
            sx={{ width: "42px", height: "42px" }}
            color="success"
            onClick={onSave}
          />
        </>
      ) : (
        <Settings
          sx={{ width: "30px", height: "30px" }}
          onClick={onToggleEditMode}
        />
      )}
    </Box>
  );
}
