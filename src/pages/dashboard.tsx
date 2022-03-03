import UserCan from "../Components/UserCan";
import { signOut, useAuthProvider } from "../contexts/AuthProvider"

import { setupAPIClient } from "../services/axios";
import SSRAuth from "../utils/SRRAuth";

export default function Dashboard() {
  

  const {user, signOut} = useAuthProvider();

  return(
    <div>
      <h1>Dashboard </h1>
      <h2>Bem-vindo {user?.email}</h2>
        <button onClick={() => setTimeout(() => signOut(), 2500) }>Logout</button>
      <UserCan permissions ={['metrics.list']}>
        <h1>This is secret</h1>
      </UserCan>
    </div>
  )
}

export const getServerSideProps = SSRAuth(async (ctx) => {
 
  //@ts-ignore
  const apiClient =  setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response);

  return {
    props: {}
  }
})


