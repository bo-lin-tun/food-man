import {
  CreateMenuOptions,
  DeleteMenuOptions,
  GetMenusOptions,
  MenuSlice,
  UpdateMenuOptions,
} from "@/types/menu";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeDisabledLocationMenu,
  setDisabledLocationMenus,
} from "./disabledLocationMenuSlice";
import { removeMenuAddonCategoryByMenuId } from "./menuAddonCategorySlice";
import {
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} from "./menuCategoryMenuSlice";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const getMenus = createAsyncThunk(
  "menu/getMenus",
  async (options: GetMenusOptions, thunkApi) => {
    const { locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/menus?locationId=${locationId}`
      );
      const menus = await response.json();
      thunkApi.dispatch(setMenus(menus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (options: CreateMenuOptions, thunkApi) => {
    const { name, price, assetUrl, menuCategoryIds, onSuccess, onError } =
      options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, price, assetUrl, menuCategoryIds }),
      });
      const { menu, menuCategoryMenus } = await response.json();
      thunkApi.dispatch(addMenu(menu));
      thunkApi.dispatch(addMenuCategoryMenu(menuCategoryMenus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (options: UpdateMenuOptions, thunkApi) => {
    const {
      id,
      name,
      price,
      menuCategoryIds,
      locationId,
      isAvailable,
      onSuccess,
      onError,
    } = options;
    console.log("Options: ", options);
    console.log("isAvailable: ", isAvailable);
    try {
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          price,
          menuCategoryIds,
          locationId,
          isAvailable,
        }),
      });
      const { menu, menuCategoryMenus, disabledLocationMenus } =
        await response.json();
      console.log(menuCategoryMenus);
      thunkApi.dispatch(replaceMenu(menu));
      thunkApi.dispatch(replaceMenuCategoryMenu(menuCategoryMenus));
      if (isAvailable === false) {
        thunkApi.dispatch(setDisabledLocationMenus(disabledLocationMenus));
      } else {
        thunkApi.dispatch(
          removeDisabledLocationMenu({ locationId, menuId: id })
        );
      }
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      onError && onError();
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (options: DeleteMenuOptions, thunkApi) => {
    const { id, onSuccess, onError } = options;
    try {
      await fetch(`${config.apiBaseUrl}/menus?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeMenu({ id }));
      thunkApi.dispatch(removeMenuAddonCategoryByMenuId({ menuId: id }));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
    replaceMenu: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    addMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setMenus, replaceMenu, removeMenu, addMenu } = menuSlice.actions;
export default menuSlice.reducer;
