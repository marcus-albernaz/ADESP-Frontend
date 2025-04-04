import React, { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginRequest = {
  login: string,
  password: string
}

export type AuthenticationContextTypes = {
  accessToken: string | null,
  login: (credentials: LoginRequest, callback: (message: string) => void) => void
  logout: () => void
}

export type LoginResponse = {
  accessToken: string
}

export type AuthenticationProviderTypes = {
  children: React.JSX.Element | React.JSX.Element[] | null;
}
