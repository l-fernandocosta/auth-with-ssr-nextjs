import { useAuthProvider } from "../contexts/AuthProvider"
import ValidateUserPermissions from "../utils/validateUserPermissions";

interface UserProps {
  roles?: string[],
  permissions?: string[]
}


export default function useCan({roles=[], permissions = []} : UserProps) {

  const {isAuth, user} = useAuthProvider();

  if(!isAuth) {
    return false;
  }
  const hasUserPermissions = ValidateUserPermissions({user, permissions, roles})
  return hasUserPermissions;
  
}