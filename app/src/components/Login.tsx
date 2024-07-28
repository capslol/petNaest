import React, {ChangeEvent, useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    LoginContainer,
    LoginForm,
    FormGroup,
    FormLabel,
    FormInput,
    LoginButton,
    Title, Message, HighlightLink
} from '../styles/LoginPageStyles';


interface Promises {
    name: string,
    price: number,
    count: number

}
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate()


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

                <Message>
                    Not registered yet?{' '}
                    <HighlightLink href="#" onClick={() => navigate('/register')}>
                        Register now
                    </HighlightLink>
                </Message>
            </LoginForm>
        </LoginContainer>
    );
};

export default LoginPage;
