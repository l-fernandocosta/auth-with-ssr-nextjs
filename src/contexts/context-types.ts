import { HeadersDefaults } from "axios";
import { ReactNode } from "react";

export interface SignInCredentials {
  email: string, 
  password: string 
}

export interface  AuthContextProps {
  children: ReactNode
}

export interface AuthContextData {
  signIn: (credentials: SignInCredentials ) =>  Promise<void>;
  signOut: () => void; 
  isAuth: boolean, 
  user: UserProps | undefined;
}

export interface UserProps {
  email: string, 
  roles: string[],
  permissions: string[]
}

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
