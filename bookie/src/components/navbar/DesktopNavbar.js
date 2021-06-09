import { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
    btn: {
        textTransform: 'none'
    }
});

class DesktopNavbar extends PureComponent {
    render() {
        console.log("render DesktopNavbar");

        const { classes, mobileView, items, onClickItem } = this.props;
        const rootStyle = {
            display: mobileView ? 'none' : 'block'
        };

        return (
            <div style={rootStyle}>
                {items.map(item => {
                    const { label, link } = item;
                    return (
                        <Button
                            key={label}
                            className={classes.btn}
                            onClick={() => onClickItem(link)}
                        >
                            {label}
                        </Button>
                    );
                })
                }
            </div>
        );
    }
};

export default withStyles(styles)(DesktopNavbar);