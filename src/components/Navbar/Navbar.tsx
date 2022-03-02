import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import { AuthCheck } from 'reactfire';

const useStyles = makeStyles({
    logo:{
        content: `url(${logo})`,
        maxWidth: '15%',
        height: 'auto',
    },
    navlogo:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
    },
    navbar: {
        backgroundColor: '#DFD21E',
        zIndex: 1,
        borderBottom: '1px black',
    },
    navbarItem: {
        color: 'brown',
        textDecoration: 'none',
        alignItems: 'flex-end',
    },
    padding: {
        padding: '5px',
    },
    space: {
        justifyContent: 'space-between'
    },
    ul: {
        listStyleType: 'none',
    },
    width50:{
        width: '50%',
    },
    width100: {
        width: '100%',
    },
    psides: {
        paddingLeft: '5px',
        paddingRight: '5px',
    }
})

export const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={`${classes.row} ${classes.navbar} ${classes.width100} ${classes.padding} ${classes.space}` }>
            <div className={`${classes.navlogo}`}>
                <Link to='/' className={`${classes.logo} ${classes.padding}`} />
            </div>
            <div className={`${classes.width50}`}>
                <ul className={`${classes.ul} ${classes.row} ${classes.space} ${classes.psides}`}>
                    <Suspense fallback ={'loading...'}>  
                        <AuthCheck fallback={
                            <li>
                                <Button>
                                    <Link to='/Signin' className={`${classes.navbarItem} ${classes.psides}`}>Sign In</Link>
                                </Button>
                            </li>
                        }>
                            <li>
                                <Button>
                                    <Link to='/Whiskey' className={`${classes.navbarItem} ${classes.psides}`}>Whiskey</Link>
                                </Button>
                            </li>
                        </AuthCheck>
                    </Suspense>
                </ul>
            </div>
        </div>
    )
}