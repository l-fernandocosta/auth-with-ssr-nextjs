import { createContext, ReactNode, useContext } from "react";

interface SignInCredentials {
  email: string, 
  password: string 
}

interface  AuthContextProps {
  children: ReactNode
}

interface AuthContextData {
  signIn(credentials: SignInCredentials ): Promise<void>;
  isAuth: boolean
}

const AuthProvider =  createContext({} as AuthContextData)
export const useAuthProvider = () => useContext(AuthProvider);




export function AuthContext( {children} : AuthContextProps) {
  const isAuth = false;

  async function signIn({email, password}: SignInCredentials) {
   
   console.log({email, password})
   
   
 }
 return ( 

  <AuthProvider.Provider value={ {signIn, isAuth}}>
      {children}
  </AuthProvider.Provider>)
}