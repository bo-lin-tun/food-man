import { AddonCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface AddonCategorySlice {
  items: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateAddonCategoryOptions extends BaseOptions {
  name: string;
  isRequired: boolean;
  menuIds: string[];
}

export interface UpdateAddonCategoryOptions extends BaseOptions {
  id: string;
  name: string;
  isRequired: boolean;
  menuIds: string[];
}

export interface DeleteAddonCategoryOptions extends BaseOptions {
  id: string;
}
