import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../../actions/auth';

// Import material-ui components
import {
    Avatar,
    Typography,
    Container,
    Button,
    Paper,
    Grid,
} from '@material-ui/core'
import Icon from './Icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Input from './Input';

import useStyles from './styles';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isSignUp) {
            dispatch(signUp(formData, navigate));
        }else{
            dispatch(signIn(formData, navigate));
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSuccess = async (response) => {
        const result = response?.profileObj
        const token = response?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token} });

            navigate('/');
        } catch (error) {
            console.log(error);
        };
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In Failed');
    };

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5' >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2} >
                        {
                            isSignUp && (
                                <>
                                    
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                    
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='702182477219-g8mob5h9pfob6kcrjaqq0ceptik4oq58.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant='contained' 
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        coockiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item >
                            <Button onClick={switchMode} >
                                {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;
