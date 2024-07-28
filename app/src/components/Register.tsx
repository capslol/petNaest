import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {loginService, registerUser} from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {
    LoginContainer,
    LoginForm,
    FormGroup,
    FormLabel,
    FormInput,
    LoginButton,
    Title,
    Message,
    HighlightLink
} from '../styles/LoginPageStyles';
import { User } from "../types/data";
import {Section} from "../styles/styles";

interface RegistrationData {
    email: string;
    password: string;
    username: string;
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: (data: RegistrationData) => registerUser(data),
        onSuccess: async () => {
            try {
                loginService({email, password})

                navigate('/');
            } catch (error) {
                console.error('Error logging in after registration:', error);
            }
        },
        onError: (error) => {
            console.error('Error registering user:', error);
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        registerMutation.mutate({ email, password, username });
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Register</Title>
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormInput
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <LoginButton type="submit">Register</LoginButton>
                <Message>
                    Already registered?{' '}
                    <HighlightLink href="#" onClick={() => navigate('login')}>
                        Login
                    </HighlightLink>
                </Message>
            </LoginForm>



        </LoginContainer>
    );
};

export default Register;
