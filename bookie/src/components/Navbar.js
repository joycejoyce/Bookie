import { Component } from "react";
import Logo from "./icon/Logo.js";
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Clear as CloseIcon, Menu as MenuIcon, Explore as ExploreIcon, ImportContacts as BookIcon, ExitToApp as SignOutIcon, Info as AboutIcon } from '@material-ui/icons';
import '../scss/Navbar.scss';

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
            fontSize: "clamp(16px, 2vmin, 20px)",
            color: theme.palette.secondary.main
        }
    }
});

const iconStyle = {
    fontSize: "clamp(24px, 4vmin, 30px)",
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

function MenuList(props) {
    const { classes } = props;

    return (
        <div className={classes.menuList + " menuList"}>
            <List component={Paper}>
                <ListItem button>
                    <ListItemIcon><ExploreIcon style={iconStyle} /></ListItemIcon>
                    <ListItemText primary="Explore Books" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><BookIcon style={iconStyle} /></ListItemIcon>
                    <ListItemText primary="My Library" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><SignOutIcon style={iconStyle} /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
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
            isListOpen: false
        }
    }

    handleOnClickMenuBtn = () => {
        const {isListOpen} = this.state;
        if (isListOpen) {
            document.querySelector(".menuList").style.display = "none";
        }
        else {
            document.querySelector(".menuList").style.display = "block";
        }
        this.setState({ isListOpen: !isListOpen });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="navbar" classes={classes.navbar}>
                <div className="contents">
                    <Logo className="logo" />
                    <MenuBtn
                        classes={classes}
                        isListOpen={this.state.isListOpen}
                        handleOnClickMenuBtn={this.handleOnClickMenuBtn}
                    />
                    <MenuList classes={classes} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);