import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/axios";
import { AuthContextData, AuthContextProps, SignInCredentials, UserProps } from "./context-types";
import Router from 'next/router';
import { setCookie } from 'nookies';

const AuthProvider =  createContext({} as AuthContextData)
export const useAuthProvider = () => useContext(AuthProvider);




export function AuthContext( {children} : AuthContextProps) {
  const [user, setUser] = useState<UserProps>();
  
  const isAuth = !!user;

  async function signIn({email, password}: SignInCredentials) {
  try {
    const response = await api.post('sessions', {
      email, 
      password
    })
    const {permissions, roles, token, refreshToken } =  response.data;

    console.log(response.data)
  
    setUser({
      email, 
      permissions, 
      roles
    })
   
    setCookie(null,'token-backendstudy', token , {
      maxAge: 30*24*60*60,
      path: "/"
    })

    setCookie(undefined, 'refreshToken-backend', token, {
      maxAge: 30*24*60*60,
      path: "/"
    })

    Router.push("/dashboard")
  }catch(err){
    console.log(err)
  }
    
 }
 return ( 

  <AuthProvider.Provider value={ {signIn, isAuth, user}}>
      {children}
  </AuthProvider.Provider>
  )
}