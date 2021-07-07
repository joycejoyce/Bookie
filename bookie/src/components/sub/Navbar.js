import { Component } from "react";
import Logo from "../icon/Logo.js";
import { withStyles } from '@material-ui/core/styles';
import '../../scss/Navbar.scss';
import { withRouter } from 'react-router-dom';
import SignOutModal from './SignOutModal.js';
import { Auth } from "aws-amplify";
import MobileNavbar from '../navbar/MobileNavbar.js';
import DesktopNavbar from '../navbar/DesktopNavbar.js';
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

const PageName = {
    explore: 'Explore Books',
    exploreResult: 'Explore Books',
    library: 'My Library',
    signIn: 'Sign In',
    home: 'Home'
  }

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
                        label: 'My Library',
                        icon: <LibraryIcon className={classes.icon} />,
                        link: '/library'
                    },
                    {
                        label: 'Explore Books',
                        icon: <ExploreIcon className={classes.icon} />,
                        link: '/explore'
                    },
                    {
                        label: 'Sign Out',
                        icon: <SignOutIcon className={classes.icon} />,
                        link: '/signOut'
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
        switch (link) {
            case '/signOut':
                this.setNestedState("signOutModalCtrl", "isOpen", true);
                break;
            default:
                const { history } = this.props;
                history.push(link);
                break;
        }
    }

    doSignOut = async () => {
        const { auth, history } = this.props;
        try {
            await Auth.signOut();
            auth.setIsAuthenticated(false);
            auth.setUser(null);
            history.push("/");
        } catch (err) {
            console.error({ err });
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
        const minWidth = 850;

        const setResponsiveness = () => {
            return window.innerWidth < minWidth
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
        const { classes, auth, history } = this.props;
        const { mobileView, items, signOutModalCtrl } = this.state;
        const theItems = auth.isAuthenticated ? items.auth : items.nonAuth;
        let activePage = PageName[window.location.pathname.replaceAll('/', '')];

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
                        activePage={activePage}
                    />
                    <DesktopNavbar
                        mobileView={mobileView}
                        onClickItem={this.handleOnClickItem}
                        items={theItems}
                        activePage={activePage}
                    />
                    <SignOutModal
                        isOpen={signOutModalCtrl.isOpen}
                        ctrl={signOutModalCtrl}
                    />
                </div>
            </div>
        );
    }
}

const StyledNavbar = withStyles(styles)(Navbar);
const RoutedNavbar = withRouter(StyledNavbar);
export default RoutedNavbar;