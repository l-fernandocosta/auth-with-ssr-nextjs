import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useAuthProvider } from './contexts/AuthProvider';
const Home: NextPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {signIn} = useAuthProvider();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data = {
      email: email, 
      password: password
    }

    signIn(data)
    
  }
  return (
   <form onSubmit={handleSubmit} >
     <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
     <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
     <button type='submit'>Login</button>
   </form>
  )
}

export default Home
