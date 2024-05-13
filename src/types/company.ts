import { Company } from "@prisma/client";
import { BaseOptions } from "./app";

export interface CompanySlice {
  item: Company | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateCompanyOptions extends BaseOptions {
  id: string;
  name: string | null;
  street: string | null;
  township: string | null;
  city: string | null;
}
