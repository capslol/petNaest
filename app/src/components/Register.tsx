import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {Navigate, useNavigate} from "react-router-dom";
import {loginFx, registerUserFx} from "../store/authStore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const queryClient = useQueryClient();


    // const {data, isLoading, isSuccess, isError } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: getUsers
    // });



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        registerUserFx({email, password})
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            {/*{mutation.isError && <p>Error registering user</p>}*/}
        </div>

    );
};

export default Register;
