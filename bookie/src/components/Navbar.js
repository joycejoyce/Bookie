import { Component } from "react";
import Logo from "./icon/Logo.js";
import { withStyles } from '@material-ui/core/styles';
import '../scss/Navbar.scss';
import { withRouter } from 'react-router-dom';
import SignOutModal from './sub/SignOutModal.js';
import { Auth } from "aws-amplify";
import MobileNavbar from './navbar/MobileNavbar.js';
import DesktopNavbar from './navbar/DesktopNavbar.js';
import {
    Explore as ExploreIcon,
    ImportContacts as LibraryIcon,
    AccountCircleSharp as SignInIcon,
    ExitToApp as SignOutIcon,
    Info as AboutIcon
} from '@material-ui/icons';

const styles = theme => ({
    navbar: {
        position: 'relative'
    },
    icon: {
        color: '#073B4C',
        cursor: 'pointer',
        fontSize: "24px"
    }
});

class Navbar extends Component {
    constructor(props) {
        const { classes } = props;
        super(props);
        this.state = {
            signOutModalCtrl: {
                isOpen: false,
                onOpen: this.handleOnOpenSignOutModal,
                onClose: this.handleOnCloseSignOutModal,
                doSignOut: this.doSignOut
            },
            mobileView: true,
            removeResizeEventListener: null,
            items: {
                auth: [
                    {
                        label: 'Explore Books',
                        icon: <ExploreIcon className={classes.icon} />,
                        link: '/explore'
                    },
                    {
                        label: 'My Library',
                        icon: <LibraryIcon className={classes.icon} />,
                        link: '/library'
                    },
                    {
                        label: 'Sign Out',
                        icon: <SignOutIcon className={classes.icon} />,
                        link: '#'
                    },
                    {
                        label: 'About Bookie',
                        icon: <AboutIcon className={classes.icon} />,
                        link: '#'
                    }
                ],
                nonAuth: [
                    {
                        label: 'Explore Books',
                        icon: <ExploreIcon className={classes.icon} />,
                        link: '/explore'
                    },
                    {
                        label: 'Sign In',
                        icon: <SignInIcon className={classes.icon} />,
                        link: '/signIn'
                    },
                    {
                        label: 'About Bookie',
                        icon: <AboutIcon className={classes.icon} />,
                        link: '#'
                    }
                ]
            }
        }
    }

    handleOnClickItem = (link) => {
        const { history } = this.props;
        history.push(link);
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

    setNestedState = (parentName, childName, value) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }));
    }

    componentDidMount() {
        const setResponsiveness = () => {
            return window.innerWidth < 600
              ? this.setState({ mobileView: true })
              : this.setState({ mobileView: false })
          };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        const removeResizeEventListener = () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }

        this.setState({ removeResizeEventListener });
    }

    render() {
        console.log("render Navbar");
        const { classes, auth, history } = this.props;
        const { mobileView, items } = this.state;
        const theItems = auth.isAuthenticated ? items.auth : items.nonAuth;

        return (
            <div className="navbar" classes={classes.navbar}>
                <div className="contents">
                    <Logo className="logo" />
                    <MobileNavbar
                        classes={classes}
                        mobileView={mobileView}
                        auth={auth}
                        onClickItem={this.handleOnClickItem}
                        items={theItems}
                        history={history}
                        signOutModalCtrl={this.state.signOutModalCtrl}
                    />
                    <DesktopNavbar
                        mobileView={mobileView}
                        onClickItem={this.handleOnClickItem}
                        items={theItems}
                    />
                    <SignOutModal
                        isOpen={this.state.signOutModalCtrl.isOpen}
                        ctrl={this.state.signOutModalCtrl}
                    />
                </div>
            </div>
        );
    }
}

const StyledNavbar = withStyles(styles)(Navbar);
const RoutedNavbar = withRouter(StyledNavbar);
export default RoutedNavbar;