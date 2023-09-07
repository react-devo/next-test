'use client'
import React from 'react'
import Signup from '../components/Signup'
import styles from '../styles/Auth.module.css';
import Link from 'next/link';
import { NotificationContainer } from 'react-notifications';

export default function SignUp() {
    return (
        <div className={styles.container}>
            <NotificationContainer />
            <div className={styles.form}>
                <Signup />
                <p className='text-center mt-4'>Already have an account ?</p>
                <Link href={'/login'} className={styles.loginBtn}>Login</Link>
            </div>

        </div>
    )
}
