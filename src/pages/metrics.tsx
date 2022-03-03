import decode from 'jwt-decode';
import { signOut, useAuthProvider } from "../contexts/AuthProvider"
import useCan from "../hooks/useCan";
import { setupAPIClient } from "../services/axios";
import SSRAuth from "../utils/SRRAuth";

export default function Metrics() {

  return(
    <div>
      <h1>Metrics </h1>
     
        <button onClick={() => setTimeout(() => signOut(), 2500) } >Logout</button>
     
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
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})


