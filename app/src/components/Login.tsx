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
import MyComponent from "./test";
import {Button} from "@chakra-ui/react";


interface Promises {
    name: string,
    price: number,
    count: number

}
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        login(email, password);
    };

    return (
        <LoginContainer>
        <MyComponent name='hello'/>

            <LoginForm onSubmit={handleSubmit}>
                <Title>Login</Title>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
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
