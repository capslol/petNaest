import React, { useState } from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {login, registerUser} from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        mutation.mutate({ email, password });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
