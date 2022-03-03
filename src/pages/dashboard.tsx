import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie } from "nookies";
import { useEffect } from "react";
import { signOut, useAuthProvider } from "../contexts/AuthProvider"
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/axios";
import { TokenErrors } from "../services/errors/TokenErrors";
import SSRAuth from "../utils/SRRAuth";

export default function Dashboard() {
  
  const {user} = useAuthProvider();

  useEffect(() => {
    api.get('/me').then(response => console.log(response))
  }, [])

  return(
    <div>
      <h1>Dashboard </h1>
      <h2>Bem-vindo {user?.email}</h2>
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
})


