import type { GetServerSideProps, NextPage } from 'next'

import { FormEvent, useState } from 'react'
import { useAuthProvider } from '../contexts/AuthProvider';
import SSRGuest from '../utils/SSRGuest';
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
     <input type="password" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />
     <button type='submit'>Login</button>
   </form>
  )
}

export default Home


export const getServerSideProps : GetServerSideProps = SSRGuest(async (ctx) => {
  return {
    props: {}
  }
});

