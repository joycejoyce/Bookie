import { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
    btn: {
        textTransform: 'none',
        color: theme.palette.secondary.main,
        marginLeft: '18px'
    }
});

class DesktopNavbar extends PureComponent {
    render() {
        // console.log("render DesktopNavbar");

        const { classes, mobileView, items, onClickItem, activePage } = this.props;
        const rootStyle = {
            display: mobileView ? 'none' : 'block'
        };

        return (
            <div style={rootStyle}>
                {items.map(item => {
                    const { label, icon, link } = item;
                    const activeClassName = activePage === label ? "active" : "";
                    return (
                        <Button
                            key={label}
                            className={classes.btn + " " + activeClassName}
                            onClick={() => onClickItem(link)}
                        >
                            {icon}&nbsp;&nbsp;{label}   
                        </Button>
                    );
                })
                }
            </div>
        );
    }
};

export default withStyles(styles)(DesktopNavbar);