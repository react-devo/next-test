'use client'
import React, { useEffect, useState } from 'react';
import { validateEmail } from '../helper/helper';
import { NotificationManager } from 'react-notifications';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import InactivityTimer from './InactiveUser';


function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    // check form input value
    useEffect(() => {
        const { email, password } = formData;
        if (email?.trim()?.length > 0 || password?.trim()?.length > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // handle sumbit form data
    const handleSubmit = async (e) => {
        const { email, password } = formData;
        e.preventDefault();
        setLoading(true);
        if (validateEmail(email)) {
            try {
                const respone = await axios.post(`${process.env.API_BASE_URL}/login`, {
                    email, password
                });
                const { token } = respone?.data ?? {};
                const type = "email";
                if (token) {
                    NotificationManager.success("Successfully login up.");
                    setCookie('token', JSON.stringify({ email, token, type }));
                    setLoading(false);
                    setFormData({
                        email: '',
                        password: '',
                    })
                    router.push('/dashboard');
                } else {
                    NotificationManager.error("Something wents wrong.");
                }

            } catch (error) {
                NotificationManager.error("Something wents wrong.");
                setLoading(false);
            }

        } else {
            NotificationManager.error("Invalid email address.");
            setLoading(false);
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={disable}>{loading ? "Loading.." : "Login"}</button>
            </form>
        </div>
    );
}

export default Login;