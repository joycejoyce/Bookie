import { Component } from "react";
import Logo from "./Logo.js";

const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";

class SignIn extends Component {
    handleInputOnFocus = (e) => {
        console.log("onFocus");
        let targetElem = e.target.parentElement;
        targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnFocus;
    }

    handleInputOnChange = (e) => {

    }

    handleInputOnBlur = (e) => {
        console.log("OnBlur");
        const value = e.target.value;
        let targetElem = e.target.parentElement;
        if (value.length === 0) {
            targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnBlur;
        }
        else {
            targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnBlur_hasText;
        }
    }

    render() {
        return (
            <div className="signIn">
                <div className="contents">
                    <Logo />
                    <h1>Sign In</h1>
                    <div className="inputText inputTextOnBlur">
                        <label htmlFor="email">Enter email address</label>
                        <input className="test" type="text" id="email"
                        onFocus={(e) => this.handleInputOnFocus(e)}
                        onChange={(e) => this.handleInputOnChange(e)}
                        onBlur={(e) => this.handleInputOnBlur(e)}/>
                    </div>
                    <div className="btnSection">
                        <button className="createAccountBtn">Create account</button>
                        <button className="nextBtn">Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;