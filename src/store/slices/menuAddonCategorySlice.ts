import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MenuAddonCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuAddonCategorySlice = createSlice({
  name: "menuAddonCategorySlice",
  initialState,
  reducers: {
    setMenuAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addMenuAddonCategories: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    replaceMenuAddonCategory: (state, action) => {
      const addonCategoryId = action.payload[0].addonCategoryId;
      const otherMenuAddonCategory = state.items.filter(
        (item) => item.addonCategoryId !== addonCategoryId
      );
      state.items = [...otherMenuAddonCategory, ...action.payload];
    },
  },
});

export const {
  setMenuAddonCategories,
  addMenuAddonCategories,
  replaceMenuAddonCategory,
} = menuAddonCategorySlice.actions;
export default menuAddonCategorySlice.reducer;