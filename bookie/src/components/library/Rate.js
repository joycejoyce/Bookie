import React from 'react';
import { IconButton } from '@material-ui/core';
import { Star as FilledStarIcon, StarBorder as EmptyStarIcon } from '@material-ui/icons';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { rateTheme } from '../Theme.js';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    icon: {
        fontSize: '1.3rem'
    }
});

const Rate = React.memo(({ classes, id, rate, ctrl }) => {
    if (!rate) {
        rate = 0;
    }
    const filled = Array.from(Array(rate).keys());
    const empty = Array.from(Array(5).keys()).filter(x => !filled.includes(x));
    const { onClickRate } = ctrl;
    console.log({filled});
    console.log({empty});

    return (
        <ThemeProvider theme={rateTheme}>
            <div className={classes.root}>
                {filled.map(key => (
                    <IconButton
                        onClick={() => onClickRate(id, key+1)}
                        size="small"
                        color="primary"
                    >
                        <FilledStarIcon
                            key={key}
                            className={classes.icon}
                        />
                    </IconButton>
                ))
                }
                {empty.map(key => (
                    <IconButton
                        onClick={() => onClickRate(id, key+1)}
                        size="small"
                    >
                        <EmptyStarIcon
                            key={key}
                            className={classes.icon}
                        />
                    </IconButton>
                ))
                }
            </div>
        </ThemeProvider>
    )
});

// export default Rate;
export default withStyles(styles)(Rate);