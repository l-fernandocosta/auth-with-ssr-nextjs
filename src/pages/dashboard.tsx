import { useEffect } from "react";
import { signOut, useAuthProvider } from "../contexts/AuthProvider"
import { api } from "../services/axios";

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