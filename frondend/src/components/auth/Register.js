import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [blink, setBlink] = useState(false);

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8000/api/register/', data)
                .then((response) => {
                    console.log("success", response.data);
                    reset();
                    toast.success('Register Success');
                    toast.info('Please login to continue!');
                    navigate('/login');
                }).catch((error) => {
                    console.log("failed", error.response);
                    if (error.response.status === 409) {
                        setBlink(true);
                        setTimeout(() => setBlink(false), 1000);
                        toast.info('hmmm! We recognise you');
                    }
                });
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (errors.username) {
            toast.error(errors.username.message);
        }
        if (errors.password) {
            toast.error(errors.password.message);
        }
        if (errors.email) {
            toast.error(errors.email.message);
        }
    }, [errors.username, errors.password, errors.email]); 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1 text-gray-600">Username</label>
                        <input
                            id="username"
                            type="text"
                            {...register('username', { required: 'Username is required' })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>
                </form>
                    <p className="mt-4 text-center">
                        Already have an account? 
                        <Link style={{ padding: '0.5rem' }} to="/login" className={`text-blue-500 hover:underline ${blink ? 'blink' : ''}`}>
                            Login
                        </Link>
                    </p>
            </div>
        </div>
    );
}

export default Register;
