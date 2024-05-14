import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuCategorySlice {
  items: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateMenuCategoryOptions extends BaseOptions {
  name: string;
  locationId: string | null;
}

export interface UpdateMenuCategoryOptions extends BaseOptions {
  id: string;
  name: string;
  locationId: string | null;
  isAvailable: boolean;
}

export interface DeleteMenuCategoryOptions extends BaseOptions {
  id: string | null;
}
