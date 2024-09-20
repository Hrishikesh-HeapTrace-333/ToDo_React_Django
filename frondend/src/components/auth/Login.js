import React, {useContext, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import UserContext from '../context/user/UserContext';
import { toast } from 'react-toastify';

function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [blink, setBlink] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8000/api/login/', data)
                .then((response) => {
                    console.log("success", response.data);
                    setUser(response.data);
                    reset();
                    toast.success('Login Success, Welcome!');
                    navigate('/dashboard');
                }).catch((error) => {
                    console.log("failed", error.response);
                    if (error.response.status === 404) {
                        setBlink(true);
                        setTimeout(() => setBlink(false), 1000);
                        toast.info('Oops! We did not recognise you');
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
    }, [errors.username, errors.password]); 

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
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
                        <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link style={{ padding: '0.5rem' }} to="/register" className={`text-blue-500 hover:underline ${blink ? 'blink' : ''}`}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
