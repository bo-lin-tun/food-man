import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const disabledLocationMenuCategorySlice = createSlice({
  name: "disabledLocationMenuCategorySlice",
  initialState,
  reducers: {
    setDisabledLocationMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addDisabledLocationmenuCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeDisabledLocationmenuCategory: (
      state,
      action: PayloadAction<{ locationId: number; menuCategoryId: number }>
    ) => {
      const { locationId, menuCategoryId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.locationId === locationId &&
            item.menuCategoryId === menuCategoryId
          )
      );
    },
  },
});

export const {
  setDisabledLocationMenuCategories,
  addDisabledLocationmenuCategory,
  removeDisabledLocationmenuCategory,
} = disabledLocationMenuCategorySlice.actions;
export default disabledLocationMenuCategorySlice.reducer;
