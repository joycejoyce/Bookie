import { Component } from "react";
import Logo from "./Logo.js";
import '../SignIn.scss';
//import {handleInputOnFocus, handleInputOnBlur} from "../HandlInputTextEvents.js";
import InputText from "./InputText.js";

/*const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";*/

class SignIn extends Component {
    render() {
        return (
            <div className="signIn">
                <div className="contents">
                    <Logo />
                    <h1>Sign In</h1>
                    <InputText id="email"
                        label="Enter email address"
                        />
                    {/*<div className="inputText inputTextOnBlur">
                        <label htmlFor="email">Enter email address</label>
                        <input className="test" type="text" id="email"
                        onFocus={(e) => handleInputOnFocus(e)}
                        onBlur={(e) => handleInputOnBlur(e)}/>
                    </div>*/}
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