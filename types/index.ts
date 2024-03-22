import {SVGProps} from "react";

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