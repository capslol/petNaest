import React, {ChangeEvent, useState} from 'react';
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
import { useUnit } from 'effector-react';
import MyComponent from "./test";
import { loginFx } from '../store/authStore';



interface Promises {
    name: string,
    price: number,
    count: number

}
const LoginPage = () => {
    const navigate = useNavigate()
    const login = useUnit(loginFx)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            await loginFx({email, password})
            navigate('/')

        } catch (err){
            throw err
        }
    };

    return (
        <LoginContainer>
        <MyComponent name='hello'/>

            <LoginForm onSubmit={handleLogin}>
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
