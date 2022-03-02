import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useAuth, AuthCheck } from 'reactfire';
import 'firebase/auth';
import { Container, Button, makeStyles, Typography, Snackbar } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Navbar } from '../Navbar';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles({
    googleButton: {
        backgroundColor: 'rbg(231, 239, 84)',
        marginTop: '2em',
        padding: '0',
        color: 'brown',
        height: '50px',
        width: '240px',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 /25%) 0px 2px 4px 0px',
        fontSize: '15px',
        lineHeight: '50px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Robot, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '50px',
        height: '50px',
        display: 'block',
    },
    typographyStyle: {
        fontFamily: 'Robot, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },
    containerStyle: {
        marginTop: '2em',
    },
    snackBar: {
        color: 'brown',
        backgroundColor: 'rbg(231, 239, 84)'
    }
});

interface SignInProps{
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

export const SignIn = withRouter ((props:SignInProps) => {
    const auth = useAuth();
    const classes = useStyles();
    const { history } = props;
    const [open, setOpen] = useState(false);
    
    const handleSnackOpen = () => {
        setOpen(true)
    };

    const handleSnackClose = (event? : React.SyntheticEvent, reason?:string) => {
        if(reason === 'clickaway'){
            return;
        }

        setOpen(false);
        history.push('/')
    };

    const sign_in = async () => {
        const response = await auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
        if(response.user){
            handleSnackOpen();
        }
    };

    const sign_out = async () => {
        await auth.signOut();
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth = 'sm' className={classes.containerStyle}>
                <Typography className={classes.typographyStyle}>Whiskey Lovers Sign In</Typography>
                <form>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input name='email' placeholder='Email Here' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input name='password' placeholder='Password Here' />
                    </div>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </form>
                <AuthCheck fallback={
                    <Button className={classes.googleButton} onClick={sign_in}>Sign In with Google</Button>
               }>
                    <Button variant='contained' color='secondary' onClick={sign_out}>Sign Out</Button>
                </AuthCheck>
                <Snackbar message={'Winner'} open={open} autoHideDuration={6000} onClose={handleSnackClose}>
                    <Alert onClose={handleSnackClose} severity='success'>
                        Successful Sign In!!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
  )
});
