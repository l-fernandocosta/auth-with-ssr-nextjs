import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthProvider';
import { CommonHeaderProperties } from '../contexts/context-types';
import { TokenErrors } from './errors/TokenErrors';

interface FailedRequestProps{
   onSuccess: (token: string) => void;
    onFailure: (error: AxiosError<any, any>) => void; 
}


let isRefreshing = false;
let failedRequestsQueu: FailedRequestProps[] = [];

export function setupAPIClient(ctx = undefined) {

  let cookies = parseCookies(ctx);
  const api = axios.create({
  baseURL: "http://localhost:3334",
  headers: { Authorization: `Bearer ${cookies['nextauth.token']}` }
}); 

api.interceptors.response.use(

  (response) => { return response },

  (error: AxiosError) => {

    if (error.response?.status === 401) {
      console.log(error.response)

      if (error.response.data.code === 'token.expired') {
        console.log("Renovar token ")

        let cookies = parseCookies(ctx);
        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig  = error.config;

        if (!isRefreshing) {
          isRefreshing = true;
          console.log('Refreshing')

          api.post('/refresh', {
            refreshToken
          }).then((response) => {


            setCookie(ctx, 'nextauth.token', response.data.token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            api.defaults.headers = { Authorization: `Bearer ${response.data.token}` } as CommonHeaderProperties;

            
            failedRequestsQueu.forEach(request => request.onSuccess(response.data.token));
            failedRequestsQueu= [];
          }).catch(err => {
            
            failedRequestsQueu.forEach(request => request.onFailure(err))
            failedRequestsQueu = [];
            if(typeof window === 'undefined'){
              signOut();
              console.log(typeof window)
            }
          }).finally(() => {
            isRefreshing=false;
          });
          //axios não suporta que o interceptor use async 
        } return new Promise((resolve, reject) => {
          failedRequestsQueu.push({
            onSuccess: ( token: string ) => {
              originalConfig.headers = {Authorization : `Bearer ${token}`};
              resolve(api(originalConfig));
            },
            onFailure: (error : AxiosError) => {
              reject(error);
            } ,
          })
        })
      } else {
        if(typeof window === 'undefined'){
          signOut();
        } else {
          return Promise.reject(new TokenErrors());
        }
      }
    }
    return Promise.reject(error);
  }); 

  return api; 
}