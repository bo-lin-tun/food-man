import { Menu } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuSlice {
  items: Menu[];
  isLoading: boolean;
  error: Error | null;
}

export interface GetMenusOptions extends BaseOptions {
  locationId: string;
}

export interface CreateMenuOptions extends BaseOptions {
  name: string;
  price: number;
  menuCategoryIds: string[];
  assetUrl?: string;
}

export interface UpdateMenuOptions extends BaseOptions {
  id: string ;
  name: string;
  price: number;
  menuCategoryIds: string[];
  locationId: string | null;
  isAvailable: boolean;
  assetUrl: string | null;
}

export interface DeleteMenuOptions extends BaseOptions {
  id: string;
}
