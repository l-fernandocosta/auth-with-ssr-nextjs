import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthProvider';
import { CommonHeaderProperties } from '../contexts/context-types';

interface FailedRequestProps{
   onSuccess: (token: string) => void;
    onFailure: (error: AxiosError<any, any>) => void; 
}


let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueu: FailedRequestProps[] = [];



export const api = axios.create({
  baseURL: "http://localhost:3334",
  headers: { Authorization: `Bearer ${cookies['nextauth.token']}` }
})

api.interceptors.response.use(
  (response) => { return response },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log(error.response)
      if (error.response.data.code === 'token.expired') {
        console.log("Renovar token ")

        const cookies = parseCookies();
        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig  = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api.post('/refresh', {
            refreshToken
          }).then((response) => {

            console.log()

            setCookie(undefined, 'nextauth.token', response.data.token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            api.defaults.headers = { Authorization: `Bearer ${response.data.token}` } as CommonHeaderProperties;

            
            failedRequestsQueu.forEach(request => request.onSuccess(response.data.token));
            failedRequestsQueu= [];
          }).catch(err => {
            
            failedRequestsQueu.forEach(request => request.onFailure(err))
            failedRequestsQueu = [];
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
        signOut();
      }
    }
    return Promise.reject(error);
  }); 