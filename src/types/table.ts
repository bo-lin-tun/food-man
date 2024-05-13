import { Table } from "@prisma/client";
import { BaseOptions } from "./app";

export interface TableSlice {
  items: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateTableOptions extends BaseOptions {
  id:string;
  name: string;
  locationId:string;
}

export interface DeleteTableOptions extends BaseOptions {
  id:string;
}

export interface CreateTableOptions extends BaseOptions {
  name: string;
  locationId?:string | null;
}
