import { Component, useState } from "react";
import Logo from "./Logo.js";
import '../scss/SignIn.scss';
import InputText from "./InputText.js";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }

    handleOnChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="signIn">
                <div className="contents">
                    <Logo />
                    <h1>Sign In</h1>
                    <InputText id="email" type="email"
                        label="Enter email address"
                        onChange={(e) => this.handleOnChange(e)}
                    />
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