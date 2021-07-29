import { useState, useEffect } from 'react';
import "../../scss/WhatSection.scss";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ChevronRight as RightIcon, ChevronLeft as LeftIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    btn: {
        minWidth: "40px",
        minHeight: "40px",
        color: "#35b0da"
    },
    icon: {
        fontSize: "3rem",
        color: "white",
        background: theme.palette.primary.main,
        borderRadius: "50%"
    }
}));

const min = 1;
const max = 5;

export default function WhatSection() {
    const classes = useStyles();
    let rootElem = null;
    const [items, setItems] = useState(
        {
            1: {
                isCurr: true
            },
            2: {
                isCurr: false
            },
            3: {
                isCurr: false
            },
            4: {
                isCurr: false
            },
            5: {
                isCurr: false
            }
        }
    );

    function IndiButton({ text }) {
        const isCurr = items[text].isCurr;
        const extraClass = isCurr ? "currIndicator" : "";
        return (
            <Button
                className={classes.btn + " " + extraClass}
                variant="outlined"
                id={"id" + text}
                onClick={handleOnClickIndiBtn(TextEvent)}
            >
                {text}
            </Button>
        );
    }

    function handleOnClickIndiBtn(num) {
        /*setItems({
            ...items,
            [num]: {
                isCurr: true
            }
        });*/
    }

    function init(dir) {
        const nonCurrElems = rootElem.querySelectorAll(".item:not(.curr)");
        const posClass = "init-" + dir;
        nonCurrElems.forEach(x => {
            x.classList.remove("init-left");
            x.classList.remove("init-right");
            x.classList.add(posClass);
        });
        
        const currElem = rootElem.querySelector(".curr");
        currElem.classList.remove("init-left");
        currElem.classList.remove("init-right");
        
        const allElems = rootElem.querySelectorAll(".item");
        allElems.forEach(x => {
            x.classList.remove("move-left");
            x.classList.remove("move-right");
            x.classList.remove("next");
        });
    }

    function move(dir) {
        init(dir);
        const action = getAction(dir);
        const nextElem = getNextElem(dir);
        nextElem.classList.add("next");
        setAction(action);
        setTimeout(() => {
            changeCurrElem(nextElem);
            init(dir);
        }, 1980);
    }

    function getAction(dir) {
        return "move-" + dir;
    }

    function getNextElem(dir) {
        const currNum = getCurrNum();
        const nextNum = getNextNum(currNum, dir);
        return rootElem.querySelector(".item" + nextNum.toString());
    }

    function getCurrNum() {
        const currName = rootElem.querySelector(".curr").classList[1];
        return parseInt(currName[currName.length-1]);
    }
    
    function getNextNum(currNum, dir) {
        let num = 0;
        if (dir === 'left') {
            num = currNum + 1 <= max ? currNum + 1 : min;
        }
        else {
            num = currNum - 1 >= min ? currNum - 1 : max;
        }
        return num;
    }

    function setAction(action) {
        const allElems = rootElem.querySelectorAll(".item");
        allElems.forEach(x => {
            x.classList.remove("move-left");
            x.classList.remove("move-right");
            x.classList.add(action);
        });
    }

    function changeCurrElem(nextElem) {
        const currElem = rootElem.querySelector(".curr");
        currElem.classList.remove("curr");
        nextElem.classList.add("curr");
    }

    useEffect(() => {
        // rootElem = document.querySelector(".whatSection .itemWrapper");
        // init("left");
    });

    return (
        <div className="whatSection">
            <video controls>
                <source src="WhatBookieDo.mp4" type="video/mp4" />
                Your browser does not support HTML video.
            </video>
            {/* <div className="container">
                <IconButton
                    className="navIcon left"
                    onClick={() => move("right")}
                >
                    <LeftIcon className={classes.icon} />
                </IconButton>
                <IconButton
                    className="navIcon right"
                    onClick={() => move("left")}
                >
                    <RightIcon className={classes.icon} />
                </IconButton>
                <div className="itemWrapper">
                    <div className="item item1 curr">
                        <div className="title">Create Account</div>
                        <img src="1_CreateAccount.gif" />
                    </div>
                    <div className="item item2">
                        <div className="title">Sign In & Sign Out</div>
                        <img src="2_SignInAndOut.gif" />
                    </div>
                    <div className="item item3">
                        <div className="title">Reset Password</div>
                        <img src="2_SignInAndOut.gif" />
                    </div>
                    <div className="item item4">
                        <div className="title">Explore & Save Books</div>
                        <img src="4_ExploreBookAndSave.gif" />
                    </div>
                    <div className="item item5">
                        <div className="title">Rate & Review Books</div>
                        <img src="5_RateAndReview.gif" />
                    </div>
                </div>
                <div className="indicator">
                    <IndiButton text="1" />
                    <IndiButton text="2" />
                    <IndiButton text="3" />
                    <IndiButton text="4" />
                    <IndiButton text="5" />
                </div>
            </div> */}
        </div>
    );
}