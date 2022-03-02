import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { redirect } from 'next/dist/server/api-utils';
import { parseCookies } from 'nookies';
import { FormEvent, useState } from 'react'
import { useAuthProvider } from '../contexts/AuthProvider';
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


export const getServerSideProps : GetServerSideProps = async (ctx) => {
  
  const {'nextauth.token': token} = parseCookies(ctx);

  if(token){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }

  
  return {
    props: {}
  }
}

