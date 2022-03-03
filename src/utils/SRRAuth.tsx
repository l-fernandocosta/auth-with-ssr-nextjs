import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import decode from 'jwt-decode';
import ValidateUserPermissions from "./validateUserPermissions";

interface MyOptionProps {
  permissions?: string[],
  roles?: string[],
}

export default function SSRAuth<P>(fn: GetServerSideProps<P>, options?: MyOptionProps ) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const { 'nextauth.token': token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      };
    }
    const user  = decode<{permissions: string[], roles: string[]}>(token);
    const roles = options?.roles;
    const permissions = options?.permissions;


    const hasValidPermissions = ValidateUserPermissions({
      user, roles, permissions 
    })

    if(!hasValidPermissions) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }


    try {
      return await fn(ctx)
    }catch(err){
      destroyCookie(ctx, 'nextauth.token');
      destroyCookie(ctx, 'nextauth.refreshToken');
    
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  }
}