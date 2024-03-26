import { SVGProps } from "react";

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
  active: number;
  name: string;
}