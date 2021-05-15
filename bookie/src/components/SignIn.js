import { Component } from "react";
import Logo from "./Logo.js";
import '../scss/SignIn.scss';
import InputText from "./InputText.js";
import BtnSection from "./BtnSection.js";
import { Msg_UsernameBlank, Msg_PasswordBlank } from "./Message.js";
import { getClassName_init, getClassName_onSubmit } from "./InputClassNameGetter.js";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                name: "username",
                label: "Username",
                value: "",
                type: "text",
                isValid: true,
                errMsg: "",
                className: getClassName_init()
            },
            password: {
                name: "password",
                label: "Password",
                value: "",
                type: "password",
                isValid: true,
                errMsg: "",
                className: getClassName_init()
            },
            isFormValid: true,
            errMsg: ""
        };
    }

    handleOnChange = (e) => {
        const {value, id} = e.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value
            }
        }));
    }

    handleOnClickRightBtn = () => {
        let isFormValid = this.checkForm();
        if (!isFormValid) {
            return;
        }
    }

    checkForm = () => {
        const errMsg_username = this.checkUsername();
        const isValid_username = errMsg_username.length === 0;
        this.setState_byValidateResult("username", isValid_username, errMsg_username);

        const errMsg_password = this.checkPassword();
        const isValid_password = errMsg_password.length === 0;
        this.setState_byValidateResult("password", isValid_password, errMsg_password);
    }

    checkUsername = () => {
        const username = this.state.username.value;
        if (username.length === 0) {
            return Msg_UsernameBlank;
        }
        return "";
    }

    checkPassword = () => {
        const password = this.state.password.value;
        if (password.length === 0) {
            return Msg_PasswordBlank;
        }
        return "";
    }

    setState_byValidateResult = (name, isValid, errMsg) => {
        const className = getClassName_onSubmit(isValid);
        this.setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                isValid,
                errMsg,
                className
            }
        }));
    }

    render() {
        return (
            <div className="signIn">
                <div className="contents">
                    <Logo />
                    <h1>Sign In</h1>
                    <div className="formErrMsg">{this.state.errMsg}</div>
                    <div className="inputSection">
                        <InputText data={this.state.username} handleOnChange={this.handleOnChange} />
                        <InputText data={this.state.password} handleOnChange={this.handleOnChange} />
                    </div>
                    <div className="forgotPwd">Forgot password?</div>
                    <BtnSection leftBtnText="Create account"
                        handleOnClickRightBtn={this.handleOnClickRightBtn}
                    />
                </div>
            </div>
        );
    }
}

export default SignIn;