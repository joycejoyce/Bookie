import { Component } from "react";
import Logo from "./Logo.js";
import '../CreateAccount.scss';

class CreateAccount extends Component {
    render() {
        return(
            <div className="createAccount">
                <div className="contents">
                    <Logo />
                    <h1>Create your Bookie Account</h1>

                </div>
            </div>
        );
    }
}

export default CreateAccount;