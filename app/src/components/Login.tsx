import React, {ChangeEvent, useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CopyValue from '../helpers/CopyBlock';
import {
    LoginContainer,
    LoginForm,
    FormGroup,
    FormLabel,
    FormInput,
    LoginButton,
    Title
} from '../styles/LoginPageStyles';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        login(email, password);
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <p>arinavasch@gmail.com</p>
                    <CopyValue />

                    <FormInput
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <LoginButton type="submit">Login</LoginButton>
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginPage;
