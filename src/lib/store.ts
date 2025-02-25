import { create } from "zustand";

type State = {
  open: boolean;
  // menuItems: any[];
};

type Actions = {
  setOpen: (_newState: boolean) => void;
};

export const useMenuStore = create<State & Actions>((set) => ({
  open: false,
  setOpen: (newState) => set({ open: newState }),
}));
