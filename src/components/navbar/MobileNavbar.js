
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
    Clear as CloseIcon,
    Menu as MenuIcon
} from '@material-ui/icons';
import { PureComponent } from 'react';
import clsx from 'clsx';

const styles = theme => ({
    menuList: {
        position: 'absolute',
        right: 'clamp(28px, 6vmin, 36px)',
        top: '1vmin',
        '& .MuiListItemText-primary': {
            fontSize: "clamp(0.875rem, 2vmin, 1rem)",
            color: theme.palette.secondary.main
        },
        opacity: 0,
        transform: 'scale(0)'  
    },
    // menuListDisappear: {
    //     animation: `$fadeOut 2000ms ease-out`
    // },
    // menuListAppear: {
    //     opacity: 1,
    //     transform: 'scale(1)',
    //     animation: `$fadeIn 2000ms ease-in`
    // },
    // '@keyframes fadeIn': {
    //     '0%': {
    //         opacity: 0
    //     },
    //     '100%': {
    //         opacity: 1
    //     }
    // },
    // '@keyframes fadeOut': {
    //     '0%': {
    //         opacity: 1,
    //         transform: 'scale(1)'
    //     },
    //     '99.9%': {
    //         transform: 'scale(1)'
    //     },
    //     '100%': {
    //         opacity: 0,
    //         transform: 'scale(0)'
    //     }
    // }
});

function MenuList({ classes, items, onClick, isListOpen, activePage }) {
    return (
        <div
            className={classes.menuList + " menuList"}
            // className={clsx(classes.menuList, {
            //     [classes.menuListAppear]: isListOpen
            // }, {
            //     [classes.menuListDisappear]: !isListOpen
            // })}
        >
            <List component={Paper}>
                {items.map(item => {
                    const { label, icon, link } = item;
                    const activeClassName = activePage === label ? "activeMobile" : "";
                    
                    return (
                        <ListItem
                            key={label}
                            button
                            onClick={() => onClick(link)}
                            disabled={!isListOpen}
                            className={activeClassName}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    );
                })
                }
            </List>
        </div>
    );
}

function MenuBtn(props) {
    const { classes, isListOpen, onClick } = props;

    return (
        <div className="menuBtn">
            { isListOpen ?
                (<CloseIcon className={classes.icon} onClick={onClick} />) :
                (<MenuIcon className={classes.icon} onClick={onClick} />)
            }
        </div>
    );
}

function showMenuAnimation() {
    document.querySelector(".menuList").classList.add('menuListAppear');
    document.querySelector(".menuList").classList.remove('menuListDisappear');
}

function hideMenuAnimation() {
    document.querySelector(".menuList").classList.add('menuListDisappear');
    document.querySelector(".menuList").classList.remove('menuListAppear');
}

class MobileNavbar extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false
        }
    }

    handleOnClickMenuBtn = () => {
        const { isListOpen } = this.state;
        const newValue = !isListOpen;
        this.setState({ isListOpen: newValue });
        console.log({ newValue });
        if (newValue) {
            showMenuAnimation();
        }
        else {
            hideMenuAnimation();
        }
    }

    handleOnClickItem = (link) => {
        const { onClickItem } = this.props;
        hideMenuAnimation();
        this.setState({ isListOpen: false });
        onClickItem(link);
    }

    render() {
        const { classes, mobileView, items, activePage } = this.props;
        const { isListOpen } = this.state;
        const rootStyle = {
            display: mobileView ? 'block' : 'none'
        };

        return (
            <div style={rootStyle}>
                <MenuBtn
                    classes={classes}
                    isListOpen={isListOpen}
                    onClick={this.handleOnClickMenuBtn}
                />
                <MenuList
                    classes={classes}
                    isListOpen={isListOpen}
                    onClick={this.handleOnClickItem}
                    items={items}
                    activePage={activePage}
                />
            </div>
        );
    }
};

export default withStyles(styles)(MobileNavbar);