import { Component } from "react";
import Logo from "./Logo.js";
import InputText from "./InputText.js";
import BtnSection from "./BtnSection.js";
import "../scss/VerifyCreateAccount.scss";

class VerifyCreateAccount extends Component {
    handleOnChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        const emailAddr = "xxxtest@gmail.com";
        return(
            <div className="verifyCreateAccount">
                <div className="contents">
                    <Logo />
                    <div className="description">An email with a verification code was just sent to <span className="emailAddr">{emailAddr}</span></div>
                    <InputText id="code" type="text"
                        label="Enter code"
                        onChange={(e) => this.handleOnChange(e)}
                    />
                    <BtnSection leftBtnText="" />
                </div>
            </div>
        );
    }
}

export default VerifyCreateAccount;