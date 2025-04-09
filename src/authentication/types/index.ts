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


export type PasswordRecoveryRequest = {
  email: string
}

export type LoginFormPropTypes = {
  onOpen: () => void,
  openAction: (onOpen: () => void) => void
}

export type RecoveryRequest = {
  email: string
}

export type RecoveryFormPropTypes = {
  onOpen?: () => void,
  onClose: () => void,
  isOpen: boolean,
  onOpenChange: () => void
}

export type SignUpRequest = {
  inviteToken: string | null,
  name: string,
  cpf: string,
  username: string,
  password: string
}