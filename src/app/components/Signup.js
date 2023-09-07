'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { NotificationManager } from 'react-notifications';
import { validateEmail } from '../helper/helper';

function Signup() {
    const router = useRouter()
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // check form input value
    useEffect(() => {
        const { username, email, password } = formData;
        if (username?.trim()?.length > 0 || email?.trim()?.length > 0 || password?.trim()?.length > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [formData]);


    // handle input fields
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
                const respone = await axios.post(`${process.env.API_BASE_URL}/register`, {
                    email, password
                });
                const { id, token } = respone?.data ?? {};
                const type = "email";
                if (id && token) {
                    NotificationManager.success("Successfully sign up.");
                    setCookie('token', JSON.stringify({ email, id, token, type }));
                    setLoading(false);
                    setFormData({
                        username: '',
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
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email*:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password*:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit"  className='signUpBtn' disabled={disable ? disable : false}>{loading ? "Processing" : "Signup"}</button>
            </form>
        </div>
    );
}

export default Signup;