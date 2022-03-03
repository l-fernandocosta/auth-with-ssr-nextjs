import { ReactNode } from "react"
import { useAuthProvider } from "../contexts/AuthProvider"
import useCan from "../hooks/useCan";

interface UserCanProps {
  children: ReactNode,
  permissions?: string[],
  roles?: string[],
}


export default function UserCan({ children, permissions = [], roles = [] }: UserCanProps) {
  // const {isAuth, user} = useAuthProvider();
  // if(!isAuth) {
  //   return null; 
  // }
  // if(roles?.length > 0) {
  //   const hasRolles = roles.some((role) => {
  //     return user?.roles.includes(role);
  //   })
  //   if(!hasRolles){
  //     return null; 
  //   }
  // }
  // if(permissions.length > 0) {
  //   const hasPermissions = permissions.every((permission) => {
  //     return user?.permissions.includes(permission);
  //   });
  //   if(!hasPermissions){
  //     return null; 
  //   }; 
  // }

  const userIsAbleToSee = useCan({ permissions, roles })

  if (!userIsAbleToSee) {
    return null;
  } else {
    return (
      <>
        {children}
      </>
    )

  }
}