import { Component } from "react";
import Logo from "./icon/Logo.js";
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { 
    Clear as CloseIcon,
    Menu as MenuIcon,
    Explore as ExploreIcon,
    ImportContacts as BookIcon,
    AccountCircleSharp as SignInIcon,
    ExitToApp as SignOutIcon,
    Info as AboutIcon
} from '@material-ui/icons';
import '../scss/Navbar.scss';
import { withRouter } from 'react-router-dom';
import SignOutModal from './sub/SignOutModal.js';
import { Auth } from "aws-amplify";

const styles = theme => ({
    navbar: {
        position: 'relative'
    },
    menuList: {
        display: 'none',
        position: 'absolute',
        right: 'clamp(28px, 6vmin, 36px)',
        top: '1vmin',
        '& .MuiListItemText-primary': {
            fontSize: "clamp(14px, 2vmin, 18px)",
            color: theme.palette.secondary.main
        },
        opacity: 0,
        transition: 'opacity .1s ease-in'
    }
});

const iconStyle = {
    fontSize: "clamp(20px, 4vmin, 28px)",
    color: "#073B4C",
    cursor: 'pointer'
};

function MenuBtn(props) {
    const { isListOpen, handleOnClickMenuBtn } = props;

    return (
        <div className="menuBtn">
            { isListOpen ?
                (<CloseIcon style={iconStyle} onClick={handleOnClickMenuBtn} />) :
                (<MenuIcon style={iconStyle} onClick={handleOnClickMenuBtn} />)
            }
        </div>
    );
}

function AuthItems(props) {
    const { closeMenuList, signOutModalCtrl } = props;
    const { onOpen } = signOutModalCtrl;

    const handleOnClickSignOutBtn = () => {
        closeMenuList();
        onOpen();
    }

    return (
        <>
            <ListItem button>
                <ListItemIcon><BookIcon style={iconStyle} /></ListItemIcon>
                <ListItemText primary="My Library" />
            </ListItem>
            <ListItem button onClick={handleOnClickSignOutBtn}>
                <ListItemIcon>
                    <SignOutIcon
                        style={iconStyle}
                        signOutModalCtrl={signOutModalCtrl}
                    />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </ListItem>
        </>
    )
}

function NonAuthItems(props) {
    const { closeMenuList, history } = props;

    function handleOnClickSignInIcon() {
        closeMenuList();
        history.push({
            pathname: '/signIn'
        });
    }

    return (
        <>
            <ListItem button onClick={handleOnClickSignInIcon}>
                <ListItemIcon><SignInIcon style={iconStyle} /></ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
        </>
    )
}

function MenuList(props) {
    const { classes, closeMenuList, auth, history } = props;
    const { isAuthenticated } = auth;

    function handleOnClickExploreIcon() {
        closeMenuList();
        history.push({
            pathname: '/explore'
        });
    }

    return (
        <div className={classes.menuList + " menuList"}>
            <List component={Paper}>
                <ListItem button onClick={handleOnClickExploreIcon}>
                    <ListItemIcon><ExploreIcon style={iconStyle} /></ListItemIcon>
                    <ListItemText primary="Explore Books" />
                </ListItem>
                { isAuthenticated ? <AuthItems {...props} /> : <NonAuthItems {...props} /> }
                <ListItem button>
                    <ListItemIcon><AboutIcon style={iconStyle} /></ListItemIcon>
                    <ListItemText primary="About Bookie" />
                </ListItem>
            </List>
        </div>
    );
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            signOutModalCtrl: {
                isOpen: false,
                onOpen: this.handleOnOpenSignOutModal,
                onClose: this.handleOnCloseSignOutModal,
                doSignOut: this.doSignOut
            }
        }
    }

    async doSignOut() {
        const { auth } = this.props;
        try {
            await Auth.signOut();
            auth.setIsAuthenticated(false);
            auth.setUser(null);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    handleOnOpenSignOutModal = () => {
        this.setNestedState("signOutModalCtrl", "isOpen", true);
    }

    handleOnCloseSignOutModal = () => {
        this.setNestedState("signOutModalCtrl", "isOpen", false);
    }

    handleOnClickMenuBtn = () => {
        const { isListOpen } = this.state;
        if (isListOpen) {
            this.closeMenuList();
        }
        else {
            this.openMenuList();
        }
        this.setState({ isListOpen: !isListOpen });
    }

    closeMenuList = () => {
        document.querySelector(".menuList").style.opacity = "0";
        document.querySelector(".menuList").style.display = "none";
        this.setState({ isListOpen: false });
    }

    openMenuList = () => {
        document.querySelector(".menuList").style.opacity = "1";
        document.querySelector(".menuList").style.display = "block";
        this.setState({ isListOpen: true });
    }

    setNestedState = (parentName, childName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }));
    }

    render() {
        const { classes, auth, history } = this.props;

        return (
            <div className="navbar" classes={classes.navbar}>
                <div className="contents">
                    <Logo className="logo" />
                    <MenuBtn
                        classes={classes}
                        isListOpen={this.state.isListOpen}
                        handleOnClickMenuBtn={this.handleOnClickMenuBtn}
                    />
                    <MenuList
                        classes={classes}
                        closeMenuList={this.closeMenuList}
                        auth={auth}
                        history={history}
                        signOutModalCtrl={this.state.signOutModalCtrl}
                    />
                    <SignOutModal signOutModalCtrl={this.state.signOutModalCtrl} />
                </div>
            </div>
        );
    }
}

const StyledNavbar = withStyles(styles)(Navbar);
const RoutedNavbar = withRouter(StyledNavbar);
export default RoutedNavbar;