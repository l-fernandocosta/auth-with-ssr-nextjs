import { useAuthProvider } from "../contexts/AuthProvider"

export default function Dashboard() {
  
  const {user} = useAuthProvider();
  return(
    <div>
      <h1>Dashboard </h1>
      <h2>Bem-vindo {user?.email}</h2>
      {console.log(user?.roles)}
    </div>
  )
}