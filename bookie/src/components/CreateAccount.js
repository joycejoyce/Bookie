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
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    handleOnChange = (e) => {
        const {value, id} = e.target;
        this.setState({[id]: value});
    }

    handleOnClickShowPassword = (e) => {
        const pwdElements = document.querySelectorAll("#password,#confirmPassword");
        pwdElements.forEach((elem) => {
            if (elem.type === "password") {
                elem.type = "text";
            }
            else {
                elem.type = "password";
            }
        });
    }

    handleOnClickRightBtn = () => {
        console.log("1");
        console.log(this.props.history);
        //this.props.history.push("/signIn");
        const { history } = this.props;
        history.push("/signIn")
        console.log("2");
    }

    render() {
        return(
            <div className="createAccount">
                <div className="contents">
                    <Logo />
                    <h1>Create your Bookie Account</h1>
                    <div className="inputSection">
                        <InputText id="username" type="text"
                            label="Username"
                            onChange={(e) => this.handleOnChange(e)}
                        />
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
                            handleOnClick={(e) => this.handleOnClickShowPassword(e)}
                        />
                    </div>
                    <BtnSection leftBtnText="Sign in instead"
                        handleOnClickRightBtn={this.handleOnClickRightBtn} />
                </div>
            </div>
        );
    }
}

export default CreateAccount;