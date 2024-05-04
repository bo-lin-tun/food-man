import { Company } from "@prisma/client";
import { BaseOptions } from "./app";

export interface CompanySlice {
  item: Company | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateCompanyOptions extends BaseOptions {
  id: string;
  name: string;
  street: string;
  township: string;
  city: string;
}
