import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType, Combo } from "../types";

interface ComboState {
  selectedChips?: string;
  selectedDrink?: string;
  selectedChocolate?: string;
  combos: Combo[];
  loading: boolean;
  error: string | null;
  activeTab: ItemType;
}

const initialState: ComboState = {
  combos: [],
  loading: false,
  error: null,
  activeTab: "chips",
};

const comboSlice = createSlice({
  name: "combo",
  initialState,
  reducers: {
    setCombos: (state, action: PayloadAction<Combo[]>) => {
      state.combos = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    selectItem: (
      state,
      action: PayloadAction<{ type: ItemType; id: string }>
    ) => {
      switch (action.payload.type) {
        case "chips":
          state.selectedChips = action.payload.id;
          break;
        case "drink":
          state.selectedDrink = action.payload.id;
          break;
        case "chocolate":
          state.selectedChocolate = action.payload.id;
          break;
      }
    },
    setActiveTab: (state, action: PayloadAction<ItemType>) => {
      state.activeTab = action.payload;
    },
    resetSelection: (state) => {
      state.selectedChips = undefined;
      state.selectedDrink = undefined;
      state.selectedChocolate = undefined;
    },
  },
});

export const {
  setCombos,
  setLoading,
  setError,
  selectItem,
  setActiveTab,
  resetSelection,
} = comboSlice.actions;

export default comboSlice.reducer;
