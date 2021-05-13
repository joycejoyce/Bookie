import { Component } from "react";

class BtnSection extends Component {
    checkShouldDisplayLeftBtn = (leftBtnText) => {
        return leftBtnText.length > 0;
    }

    render() {
        const {leftBtnText, handleOnClickRightBtn} = this.props;
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
                    onClick={handleOnClickRightBtn}>Next</button>
            </div>
        );
    }
}

export default BtnSection;