import { Component } from "react";
import Logo from "./Logo.js";
import "../scss/CreateAccount.scss";
import InputText from "./InputText.js";
import InputCheckbox from "./InputCheckbox.js";
import BtnSection from "./BtnSection.js";
import { Auth } from "aws-amplify";
import { Msg_UsernameBlank, Msg_InvalidEmail, Msg_Password8Chars, Msg_PasswordNotMatch } from "./Message.js";
import { getClassName_init, getClassName_onSubmit } from "./InputClassNameGetter.js";

class CreateAccount extends Component {
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
            email: {
                name: "email",
                label: "Email",
                value: "",
                type: "email",
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
            confirmPassword: {
                name: "confirmPassword",
                label: "Confirm password",
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

    handleOnClickRightBtn = async () => {
        let isFormValid = this.checkForm();
        if (!isFormValid) {
            return;
        }
        
        try {
            const {username, email, password} = this.state;
            const response = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            console.log({response});

            this.props.history.push("/welcome");
        } catch(error) {
            console.error(error);
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({ errMsg: err.message });
        }
    }

    setClassName = (name, className) => {
        this.setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                className
            }
        }));
    }

    checkForm = () => {
        const errMsg_username = this.checkUsername();
        const isValid_username = errMsg_username.length === 0;
        this.setState_byValidateResult("username", isValid_username, errMsg_username);

        const errMsg_email = this.checkEmail();
        const isValid_email = errMsg_email.length === 0;
        this.setState_byValidateResult("email", isValid_email, errMsg_email);

        const errMsg_password = this.checkPassword();
        const isValid_password = errMsg_password.length === 0;
        this.setState_byValidateResult("password", isValid_password, errMsg_password);

        const errMsg_confirmPssword = this.checkConfirmPassword();
        const isValid_confirmPssword = errMsg_confirmPssword.length === 0;
        this.setState_byValidateResult("confirmPassword", isValid_confirmPssword, errMsg_confirmPssword);

        const isFormValid = isValid_username && isValid_password && isValid_confirmPssword;
        this.setState({ isFormValid });

        return isFormValid;
    }

    checkUsername = () => {
        const username = this.state.username.value;
        if (username.length === 0) {
            return Msg_UsernameBlank;
        }
        return "";
    }

    checkEmail = () => {
        const email = this.state.email.value;
        if(!/.+@.+/.test(email)) {
            return Msg_InvalidEmail;
        }
        return "";
    }

    checkPassword = () => {
        const password = this.state.password.value;
        if (password.length < 8) {
            return Msg_Password8Chars;
        }
        return "";
    }

    checkConfirmPassword = () => {
        const password = this.state.password.value;
        const confirmPassword = this.state.confirmPassword.value;
        if (confirmPassword !== password) {
            return Msg_PasswordNotMatch;
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
        return(
            <div className="createAccount">
                <div className="contents">
                    <Logo />
                    <h1>Create your Bookie Account</h1>
                    <div className="errMsg">{this.state.errMsg}</div>
                    <div className="inputSection">
                        <InputText data={this.state.username} handleOnChange={this.handleOnChange} />
                        <InputText data={this.state.email} handleOnChange={this.handleOnChange} />
                        <InputText data={this.state.password} handleOnChange={this.handleOnChange} />
                        <InputText data={this.state.confirmPassword} handleOnChange={this.handleOnChange} />
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