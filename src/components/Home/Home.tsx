import React from 'react';
import { makeStyles } from '@material-ui/core';
import whiskeyBackground from '../../assets/images/whiskeyBackground.jpg';
import { Navbar } from '../../components'


interface Props{
    title: string;
}

const useStyles = makeStyles({
    background: {
        backgroundImage: `url(${whiskeyBackground})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundReapeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute',
        zIndex: -1,
        opacity: '.75',
    },
    mainText: {
        textAlign: 'center',
        position:  'relative',
        top: '40%',
        color: 'brown',
        zIndex: 1,
    },
    textBackground: {
        backgroundColor: 'yellow',
        marginTop: '10%',
        marginLeft: '35%',
        marginRight: '35%',
        padding: '5px',
    },
    buttonForm: {
        textDecoration:'none',
        backgroundColor: 'blue',
        padding: '5px',
    }
})

export const Home = ( props:Props ) => {
        
    const classes = useStyles();

    return (
        <>
            <Navbar />
                <div className={`${classes.background}`}>
                    <div className={classes.textBackground}>
                        <h1 className={classes.mainText}>{props.title}</h1>
                    </div>
                </div>
        </>
    )
}
