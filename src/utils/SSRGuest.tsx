import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export default function SSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext) : Promise<GetServerSidePropsResult<P>> => {
    const {'nextauth.token': token} = parseCookies(ctx);
    if(token){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }
    return await fn(ctx)    
  }
  
}