import { Component } from "react";

class BtnSection extends Component {
    render() {
        const {leftBtnText} = this.props;
        return (
            <div className="btnSection">
                <button className="leftBtn">{leftBtnText}</button>
                <button className="rightBtn">Next</button>
            </div>
        );
    }
}

export default BtnSection;