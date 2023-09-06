'use client'
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();

  const { data: session } = useSession();
  const userData = getCookie("token") ?? '';
  const user = userData && JSON.parse(userData)
  const handlelogout = () => {
    if (user.type === "email") {
      setCookie('token', {});
      router.push('/login');
    } else if (session?.user) {
      setCookie('token', {});
      signOut({ callbackUrl: 'http://localhost:3000/login' });

    }

  }


  return (
    <div className="user-profile-cart">
      <h2>User Profile</h2>
      <div className="user-info">
        
        {user?.name && <p><strong>Name:</strong> {user?.name}</p>}
        {user?.email && <p><strong>Email:</strong> {user?.email}</p>}
        {session?.user && <p><strong>Name:</strong> {session?.user?.name}</p>}
        {session?.user && <p><strong>Email:</strong> {session?.user?.email}</p>}
        {/* Add more user information here */}
      </div>
      <div className="cart">
        <button onClick={() => handlelogout()}>Logout</button>
        {/* Display user's cart items here */}
      </div>
    </div>
  )
}
