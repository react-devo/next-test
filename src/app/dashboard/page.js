'use client'
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import Image from 'next/image';
import defautlUserImg from '../../../public/vercel.svg'
import styles from '../styles/Auth.module.css'
import InactivityTimer from '../components/InactiveUser';

export default function Dashboard() {
  const router = useRouter();

  const { data: session } = useSession();
  const userData = getCookie("token") ?? '';
  const user = userData && JSON.parse(userData);

  const handlelogout = () => {
    if (user.type === "email") {
      deleteCookie('token');
      router.push('/login');
    } else if (session?.user) {
      deleteCookie('token');
      signOut({ callbackUrl: 'http://localhost:3000/login' });

    }

  }

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
    margin: 'auto',
  }
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
       <div className={styles.userprofilecart}>
        <p>Welcome  {user?.email ?? session?.user?.name}</p>
        <InactivityTimer timeoutInSeconds={90} handlelogout={handlelogout} />
        <div className="user-info mt-4">
          {session?.user?.image ? <Image src={session?.user?.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" height={200} width={200} alt='profileImage' style={imageStyle} /> :
            <Image src={defautlUserImg} height={100} width={100} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt='profileImage' style={imageStyle} />}
          {user?.name && <div><p><strong>Name:</strong> {user?.name}</p></div>}
          {user?.email && <div> <p className="mt-4"><strong>Email:</strong> {user?.email}</p></div>}
          {session?.user && <div> <p className="mt-4"><strong>Name:</strong> {session?.user?.name}</p></div>}
          {session?.user && <div><p className="mt-4"><strong>Email:</strong> {session?.user?.email}</p></div>}
          {/* Add more user information here */}
        </div>
        <div className={styles.cartBtn}>
          <button className={styles.btnBlue} onClick={() => handlelogout()}>Logout</button>
        </div>
      </div> 
    </main>
  )
}
