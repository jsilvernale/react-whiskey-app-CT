import React, { useState } from 'react';
import { Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemText,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { useAuth } from 'reactfire';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { WhiskeyForm } from '../WhiskeyForm';

interface WhiskeyProps {
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => createStyles({
    h3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'brown',
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        color: 'brown',
        textDecoration: 'none',
        backgroundColor: '#DFD21E',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    root: {
        display: 'flex',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'],{
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marthinLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'],{
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0,1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft:0,
    },
    toolbar: {
        display: 'flex',
        backgroundColor: '#DFD21E',
        color: 'brown',
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },
    toolbar_button: {
        marginLeft: 'auto',
        color: 'brown',
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },
    margin_top: {
        marginTop: '50px',
    },
    font: {
        fontFamily: "Georgia, 'Times New Roman', Times, serif",
    },
    leftMargin: {
        marginLeft: '240px',
    },
}))

export const Whiskey = withRouter(( props: WhiskeyProps ) => {

    console.log(props);
    const { history } = props;
    const auth = useAuth();
    const classes = useStyles();
    const theme = useTheme();
    const [ open, setOpen ] = useState(false);
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClickClose = () => {
        setDialogOpen(false);
    };
    const sign_out = async () => {
        await auth.signOut();
    }
    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'SignOut',
            onClick: () => {sign_out()}
        }
    ];

    return (
        <div className={`${classes.root} ${classes.column}`}>
            <CssBaseline/>
            <AppBar position='fixed' className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color='inherit' aria-label='open-drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' className={classes.font} noWrap>
                        Whiskey Collection
                    </Typography>
                    <Button className={classes.toolbar_button} onClick={handleDialogClickOpen}>New Whiskey</Button>                    
                    <Dialog open={dialogOpen}  aria-labelledby='form-dialog-title'>
                        <DialogTitle id='form-dialog-title'>New Whiskey Entry</DialogTitle>
                        <DialogContent>
                            <WhiskeyForm/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose} color='primary'>Nevermind</Button>
                        </DialogActions>
                    </Dialog>                    
                </Toolbar>
            </AppBar>
            <MUIDrawer className={classes.drawer} variant='persistent' anchor='left' open={open} classes={{paper:classes.drawerPaper,}}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const {text, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </MUIDrawer>
            <main className={`${clsx(classes.content, {[classes.contentShift]: open,})} ${classes.leftMargin}`}>
                <div className={classes.drawerHeader} />
                <DataTable />
            </main>
        </div>
    )
});
