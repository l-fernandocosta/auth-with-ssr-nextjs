import { ReactNode } from "react";

export interface SignInCredentials {
  email: string, 
  password: string 
}

export interface  AuthContextProps {
  children: ReactNode
}

export interface AuthContextData {
  signIn(credentials: SignInCredentials ): Promise<void>;
  isAuth: boolean, 
  user: UserProps | undefined;
}

export interface UserProps {
  email: string, 
  roles: string[],
  permissions: string[]
}