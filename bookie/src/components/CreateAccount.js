import { Component } from "react";
import Logo from "./Logo.js";
import "../scss/CreateAccount.scss";
import InputText from "./InputText.js";
import InputCheckbox from "./InputCheckbox.js";
import BtnSection from "./BtnSection.js";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleOnChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        return(
            <div className="createAccount">
                <div className="contents">
                    <Logo />
                    <h1>Create your Bookie Account</h1>
                    <div className="inputSection">
                        <InputText id="email" type="email"
                            label="Email address"
                            onChange={(e) => this.handleOnChange(e)}
                        />
                        <InputText id="password" type="password"
                            label="Password"
                            onChange={(e) => this.handleOnChange(e)}
                        />
                        <InputText id="confirmPassword" type="password"
                            label="Confirm password"
                            onChange={(e) => this.handleOnChange(e)}
                        />
                        <InputCheckbox id="showPassword"
                            label="Show password"
                        />
                    </div>
                    <BtnSection leftBtnText="Sign in instead" />
                </div>
            </div>
        );
    }
}

export default CreateAccount;