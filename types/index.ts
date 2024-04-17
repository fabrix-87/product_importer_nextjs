import { Key, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface User {
  name: string;
  email: string;
}

export interface ErrorData {
  status: number;
  message: string;
}

export interface ApiResponse<T>{
  data: T|null;
  success: boolean;
  message?: string;
}

export interface ApiError {
  error: string;
}

export type Product = {
  id: number;
  reference: string;
  active: number;
  presta_id: number;
  supplier_id: number;
  parent_id: number;
  languages: ProductLanguage[],
  supplier: Supplier
}

export type ProductLanguage = {
  id: number;
  iso_code: string;
  name: string;
  language_code: string;
  pivot: {
    description: string;
    name: string;
    short_description: string;
  }
}

export type Supplier = {
  id: number;
  name: string;
}

export type Category = {
  id?: number;
  category_id?: string;
  name?: string;
  parent?: Category|null;
  supplier?: Supplier;
  presta_categories?: PrestaCategory[];
}

export type PrestaCategory = {
  id: number;
  presta_id?: number;
  name: string;
  fullName: string;
  parent_id?: number;
  active?: number;
  childrens?: PrestaCategory[]
}

export type filterType = {
  field: string,
  value: string|string[]|Key[]
}