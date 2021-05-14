import { Component } from "react";
import Logo from "./Logo.js";
import "../scss/CreateAccount.scss";
import InputText from "./InputText.js";
import InputCheckbox from "./InputCheckbox.js";
import BtnSection from "./BtnSection.js";
import { Auth } from "aws-amplify";
import { Msg_UsernameBlank, Msg_InvalidEmail, Msg_Password8Chars, Msg_PasswordNotMatch } from "./Message.js";

const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";
const ClassName_showErr = "showErr";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: "",
                isValid: true,
                errMsg: "",
                className: this.getClassName_basic()
            },
            email: {
                value: "",
                isValid: true,
                errMsg: "",
                className: this.getClassName_basic()
            },
            password: {
                value: "",
                isValid: true,
                errMsg: "",
                className: this.getClassName_basic()
            },
            confirmPassword: {
                value: "",
                isValid: true,
                errMsg: "",
                className: this.getClassName_basic()
            },
            isFormValid: true,
            errMsg: ""
        };
    }

    getClassName_basic = () => {
        return ClassName_inputText + " " + ClassName_inputTextOnBlur;
    }

    handleOnChange = (e) => {
        console.log("onChange2");
        const {value, id} = e.target;
        const className = this.getClassName_onChange(e.target);
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value,
                className
            }
        }));
    }

    getClassName_onChange = (elem) => {
        const parentElem = elem.parentElement;
        return parentElem.className;
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
        console.log("Enter handleOnClickRightBtn()");

        let isFormValid = this.checkForm();
        console.log({isFormValid});

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
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({ errMsg: err.message });
        }
    }

    checkForm = () => {
        const classList_common = this.getClassList_common(); //this.getClassListWhenCheckingForm("username", isValid_username);

        const errMsg_username = this.checkUsername();
        const isValid_username = errMsg_username.length === 0;        
        this.setErrMsg("username", isValid_username, errMsg_username);
        this.setClassName("username", isValid_username, classList_common);

        const errMsg_email = this.checkEmail();
        const isValid_email = errMsg_email.length === 0;
        this.setErrMsg("email", isValid_email, errMsg_email);
        this.setClassName("email", isValid_email, classList_common);

        const errMsg_password = this.checkPassword();
        const isValid_password = errMsg_password.length === 0;
        this.setErrMsg("password", isValid_password, errMsg_password);
        this.setClassName("password", isValid_password, classList_common);

        const errMsg_confirmPssword = this.checkConfirmPassword();
        const isValid_confirmPssword = errMsg_confirmPssword.length === 0;
        this.setErrMsg("confirmPssword", isValid_confirmPssword, errMsg_confirmPssword);
        this.setClassName("confirmPssword", isValid_confirmPssword, classList_common);

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
        if (!confirmPassword === password) {
            return Msg_PasswordNotMatch;
        }
        return "";
    }

    getClassList_common = () => {
        const classList = [ClassName_inputText, ClassName_inputTextOnFocus];
        return classList;
    }

    // getClassListWhenCheckingForm = (name, isValid) => {
    //     const classList = [ClassName_inputText, ClassName_inputTextOnFocus];
    //     if (!isValid) {
    //         classList.push(ClassName_showErr);
    //     }
    //     return classList;
    // }

    setErrMsg = (name, isValid, errMsg) => {
        this.setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                isValid,
                errMsg
            }
        }));
    }

    setClassName = (name, isValid, classList) => {
        console.log("orig", classList);
        if (isValid) {
            classList = classList.filter(c => c !== ClassName_showErr);
        }
        else {
            classList.push(ClassName_showErr);
        }
        console.log("final", classList);
        const className = classList.join(" ");
        
        this.setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                className
            }
        }));
    }

    handleOnFocus = (e) => {
        const {id} = e.target;
        const {isValid} = this.state[id];
        const classList = [ClassName_inputText, ClassName_inputTextOnFocus];
        this.setClassName(id, isValid, classList);
    }

    handleOnBlur = (e) => {
        const {id, value} = e.target;
        const {isValid} = this.state[id];
        const classList = [ClassName_inputText];
        if (value.length === 0) {
            classList.push(ClassName_inputTextOnBlur);
        }
        else {
            classList.push(ClassName_inputTextOnBlur_hasText);
        }
        this.setClassName(id, isValid, classList);
    }

    render() {
        return(
            <div className="createAccount">
                <div className="contents">
                    <Logo />
                    <h1>Create your Bookie Account</h1>
                    <div className="errMsg">{this.state.errMsg}</div>
                    <div className="inputSection">
                        <InputText id="username" className={this.state.username.className}
                            value={this.state.username.value} type="text"
                            label="Username"
                            onFocus={(e) => this.handleOnFocus(e)}
                            onBlur={(e) => this.handleOnBlur(e)}
                            onChange={(e) => this.handleOnChange(e)}
                            errMsg={this.state.username.errMsg}
                        />
                        <InputText id="email" className={this.state.email.className}
                            value={this.state.email.value} type="email"
                            label="Email address"
                            onFocus={(e) => this.handleOnFocus(e)}
                            onBlur={(e) => this.handleOnBlur(e)}
                            onChange={(e) => this.handleOnChange(e)}
                            errMsg={this.state.email.errMsg}
                        />
                        <InputText id="password" className={this.state.password.className}
                            value={this.state.password.value} type="password"
                            label="Password"
                            onFocus={(e) => this.handleOnFocus(e)}
                            onBlur={(e) => this.handleOnBlur(e)}
                            onChange={(e) => this.handleOnChange(e)}
                            errMsg={this.state.password.errMsg}
                        />
                        <InputText id="confirmPassword" className={this.state.confirmPassword.className}
                            value={this.state.confirmPassword.value} type="password"
                            label="Confirm password"
                            onFocus={(e) => this.handleOnFocus(e)}
                            onBlur={(e) => this.handleOnBlur(e)}
                            onChange={(e) => this.handleOnChange(e)}
                            errMsg={this.state.confirmPassword.errMsg}
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