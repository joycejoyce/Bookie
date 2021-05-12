import { Component } from "react";
import Logo from "./Logo.js";
import "../CreateAccount.scss";
import InputText from "./InputText.js";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
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
                    </div>
                    <div className="inputCheckbox">
                        <input type="checkbox" id="showPassword" />
                        <label htmlFor="showPassword">Show password</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateAccount;