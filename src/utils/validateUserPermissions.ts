
interface User {
  roles: string[],
  permissions: string[],
}



interface ValidateUserProps {
  permissions?: string[],
  roles?: string[],
  user: User| undefined,
}

export default function ValidateUserPermissions({
  user, 
  permissions=[], 
  roles=[]} : ValidateUserProps) {



  if(permissions.length> 0){
    const hasAllPermissions = permissions.every((permission) => {      
      return user?.permissions.includes(permission);
    })
    if(!hasAllPermissions) {
      return false; 
    }
  }
  if(roles.length > 0) {
    const hasAllRoles = roles.some((role) => {
      return user?.roles.includes(role)
    })
    if(!hasAllRoles){
      return false; 
    }
  }
  return true; 

}