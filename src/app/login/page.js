'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import Login from '../components/Login';
import styles from '../styles/Auth.module.css';
import Link from 'next/link';
import { NotificationContainer } from 'react-notifications';

export default function SignIn() {
  const [signInLoading, setSignInLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setSignInLoading(true);
    const data = await signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' });
    setSignInLoading(false);
  }
  return (
    <div className={styles.container}>
      <NotificationContainer />
      <div className={styles.form}>
        <Login />
        <h1 className='text-center mt-4 mb-4'>Or Sign In</h1>
        <button onClick={() => handleGoogleLogin()}>{signInLoading ? "Loading.." : "Sign in with Google"}</button>
        <div className={styles.flexBox}>
          <p>Not a member? </p><Link href='/signup'>Sign Up</Link>
        </div>
      </div>
    </div>

  );
}

