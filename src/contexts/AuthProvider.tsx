import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/axios";
import { AuthContextData, AuthContextProps, CommonHeaderProperties, SignInCredentials, UserProps } from "./context-types";
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { HeadersDefaults } from "axios";

const AuthProvider =  createContext({} as AuthContextData)
export const useAuthProvider = () => useContext(AuthProvider);

export function signOut(){
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');
  Router.push('/');
}

export function AuthContext( {children} : AuthContextProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuth = !!user; 

  useEffect(() => {
      const {'nextauth.token': token} = parseCookies();

     if(token) {
       api.get('/me').then(response => {
         const {email, roles, permissions} = response.data;
         setUser({
          email, roles, permissions
        })
       }).catch((err) => {
        signOut();
       })
       
     }
  }, [])



  async function signIn({email, password}: SignInCredentials) {
  try {
    const response = await api.post('sessions', {
      email, 
      password
    })
    const {permissions, roles, token, refreshToken } =  response.data;

    setUser({
      email, 
      permissions, 
      roles
    })
   
    setCookie(null,'nextauth.token', token , {
      maxAge: 60 * 60 * 24 * 30,
      path: "/"
    })

    setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      maxAge: 30*24*60*60,
      path: "/"
    })

    api.defaults.headers = {Authorization: `Bearer ${token}`} as CommonHeaderProperties;

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