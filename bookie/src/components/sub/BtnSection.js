import { Component } from "react";

class BtnSection extends Component {
    checkShouldDisplayLeftBtn = (leftBtnText) => {
        return leftBtnText.length > 0;
    }

    render() {
        const {leftBtnText, rightBtnText, handleOnClickRightBtn} = this.props;
        const rightBtnText_modified = (rightBtnText && rightBtnText.length > 0) ? rightBtnText : "Next";
        const shouldDisplayLeftBtn = this.checkShouldDisplayLeftBtn(leftBtnText);
        let style = {};
        if (!shouldDisplayLeftBtn) {
            style = { display: "none" };
        }
        return (
            <div className="btnSection">
                <button className="leftBtn"
                    style={style}>{leftBtnText}</button>
                <button className="rightBtn"
                    onClick={handleOnClickRightBtn}>{rightBtnText_modified}</button>
            </div>
        );
    }
}

export default BtnSection;