import { Component } from "react";
import styled from '@emotion/styled';
import { ReactComponent as LogoImg } from '../assets/logo.svg';

const Logo = styled(LogoImg)`
    width: 90px;
`;

const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";

class SignIn extends Component {
    handleInputOnFocus = (e) => {
        console.log("onFocus");
        let classList = document.getElementsByClassName(ClassName_inputText)[0].classList;
        classList.remove(ClassName_inputTextOnBlur);
        if (!classList.contains(ClassName_inputTextOnFocus)) {
            classList.add(ClassName_inputTextOnFocus);
        }
    }

    handleInputOnChange = (e) => {

    }

    handleInputOnBlur = (e) => {
        console.log("OnBlur");
        const value = e.target.value;
        if (value.length === 0) {
            let classList = document.getElementsByClassName("inputText")[0].classList;
            classList.remove(ClassName_inputTextOnFocus);
            if (!classList.contains(ClassName_inputTextOnBlur)) {
                classList.add(ClassName_inputTextOnBlur);
            }
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
                        <button className="createAccount">Create account</button>
                        <button className="next">Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;