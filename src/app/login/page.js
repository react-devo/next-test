'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import Login from '../components/Login';
import styles from '../styles/Auth.module.css';
import Link from 'next/link';
import { NotificationContainer } from 'react-notifications';

export default function SignIn() {
  const handleGoogleLogin = async () => {
    const data = await signIn('google', { callbackUrl: 'http://localhost:3000/dashboard' });
    
  }
  return (
    <div className={styles.container}>
      <NotificationContainer />
      <div className={styles.form}>
        <Login />
        <h1>Or Sign In</h1>
        <button onClick={() => handleGoogleLogin()}>Sign in with Google</button>
        <p>Not a member? </p><Link href='/signup'>Sign Up</Link>
      </div>
    </div>

  );
}

