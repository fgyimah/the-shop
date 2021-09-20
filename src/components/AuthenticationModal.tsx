import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import { BeatLoader } from 'react-spinners';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as authHelpers from '../helpers/auth.helpers';

import 'react-tabs/style/react-tabs.css';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AuthenticationModal: React.FC<Props> = ({ open, onClose }) => {
    const [passwordShown, setPasswordShown] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(false);
    const [registerLoading, setRegisterLoading] = React.useState(false);

    const loginForm = useFormik<{
        email: string;
        password: string;
    }>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            setLoginLoading(true);
            const loggedIn = await authHelpers.loginUser(values.email, values.password);
            if (loggedIn) onClose();
            setLoginLoading(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).max(32).required(),
        }),
    });
    const signUpForm = useFormik<{
        email: string;
        name: string;
        password: string;
        confirmPassword: string;
    }>({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            setRegisterLoading(true);
            const registered = await authHelpers.createUser(
                values.email,
                values.password,
                values.name
            );
            if (registered) onClose();
            setRegisterLoading(false);
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            name: Yup.string().required(),
            password: Yup.string().min(8).max(32).required(),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required(),
        }),
    });

    const handleClickShowPassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const forgotPasswordHandler = async () => {
        if (!loginForm.values.email || loginForm.errors.email) {
            toast.error('Please specify a valid email first');
            return;
        }

        await authHelpers.sendPasswordResetMail(loginForm.values.email);
    };

    const logInWithGoogle = async () => {
        setLoginLoading(true);
        setRegisterLoading(true);
        const loggedIn = await authHelpers.loginWithGoogle();
        if (loggedIn) onClose();
        setLoginLoading(false);
        setRegisterLoading(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                if (loginLoading || registerLoading) return;
                onClose();
            }}
            maxWidth="sm"
            fullWidth>
            <DialogContent>
                <Tabs disabled={loginLoading || registerLoading}>
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>Sign up</Tab>
                    </TabList>
                    <TabPanel>
                        <StyledDiv>
                            <form className="form" onSubmit={loginForm.handleSubmit}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    className="field"
                                    inputProps={{ className: 'input-field' }}
                                    fullWidth
                                    variant="outlined"
                                    value={loginForm.values.email}
                                    onChange={loginForm.handleChange}
                                    error={!!loginForm.errors.email}
                                    helperText={loginForm.errors.email}
                                    disabled={loginLoading}
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type={passwordShown ? 'text' : 'password'}
                                    className="field"
                                    fullWidth
                                    inputProps={{ className: 'input-field' }}
                                    variant="outlined"
                                    value={loginForm.values.password}
                                    onChange={loginForm.handleChange}
                                    error={!!loginForm.errors.password}
                                    helperText={loginForm.errors.password}
                                    disabled={registerLoading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {passwordShown ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span className="forgot-password" onClick={forgotPasswordHandler}>
                                    Forgot Password?
                                </span>
                                <Button
                                    variant="contained"
                                    className="btn"
                                    type="submit"
                                    disabled={loginLoading}>
                                    {loginLoading ? <BeatLoader color="#fff" /> : 'LOGIN'}
                                </Button>
                                <p>OR</p>
                                <Button
                                    variant="contained"
                                    className="btn btn-google"
                                    onClick={logInWithGoogle}
                                    disabled={loginLoading}>
                                    LOGIN WITH GOOGLE
                                </Button>
                            </form>
                        </StyledDiv>
                    </TabPanel>
                    <TabPanel>
                        <StyledDiv>
                            <form className="form" onSubmit={signUpForm.handleSubmit}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    className="field"
                                    inputProps={{ className: 'input-field' }}
                                    fullWidth
                                    variant="outlined"
                                    value={signUpForm.values.email}
                                    onChange={signUpForm.handleChange}
                                    error={!!signUpForm.errors.email}
                                    helperText={signUpForm.errors.email}
                                    disabled={registerLoading}
                                />
                                <TextField
                                    label="Name"
                                    type="text"
                                    name="name"
                                    className="field"
                                    inputProps={{ className: 'input-field' }}
                                    fullWidth
                                    variant="outlined"
                                    value={signUpForm.values.name}
                                    onChange={signUpForm.handleChange}
                                    error={!!signUpForm.errors.name}
                                    helperText={signUpForm.errors.name}
                                    disabled={registerLoading}
                                />
                                <TextField
                                    label="Password"
                                    type={passwordShown ? 'text' : 'password'}
                                    className="field"
                                    name="password"
                                    fullWidth
                                    inputProps={{ className: 'input-field' }}
                                    variant="outlined"
                                    value={signUpForm.values.password}
                                    onChange={signUpForm.handleChange}
                                    error={!!signUpForm.errors.password}
                                    helperText={signUpForm.errors.password}
                                    disabled={registerLoading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {passwordShown ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    type={passwordShown ? 'text' : 'password'}
                                    className="field"
                                    fullWidth
                                    name="confirmPassword"
                                    inputProps={{ className: 'input-field' }}
                                    variant="outlined"
                                    value={signUpForm.values.confirmPassword}
                                    onChange={signUpForm.handleChange}
                                    error={!!signUpForm.errors.confirmPassword}
                                    helperText={signUpForm.errors.confirmPassword}
                                    disabled={registerLoading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}>
                                                    {passwordShown ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    className="btn"
                                    type="submit"
                                    disabled={registerLoading}>
                                    {registerLoading ? <BeatLoader color="#fff" /> : 'SIGN UP'}
                                </Button>
                                <p>OR</p>
                                <Button
                                    variant="contained"
                                    className="btn btn-google"
                                    onClick={logInWithGoogle}
                                    disabled={registerLoading}>
                                    CONTINUE WITH GOOGLE
                                </Button>
                            </form>
                        </StyledDiv>
                    </TabPanel>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

const StyledDiv = styled.div`
    min-height: 22rem;

    .form {
        text-align: center;
        .field {
            margin-top: 1rem;
        }
        .input-field {
            font-size: 1.5rem;
        }
        .btn {
            background: #000;
            color: #fff;
            margin-top: 1rem;
            margin-bottom: 1rem;
            padding: 1rem 0;
            width: 20rem;
        }
        .btn-google {
            background-color: #b83a3a;
        }
        .forgot-password {
            display: block;
            cursor: pointer;
            text-align: right;
            font-size: 1.3rem;
            font-weight: 700;
        }
    }
`;

export default AuthenticationModal;
