import { Component } from "react";
import Logo from "./Logo.js";
import '../scss/SignIn.scss';
import InputText from "./InputText.js";
import BtnSection from "./BtnSection.js";
import { Auth } from "aws-amplify";
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

    handleOnClickRightBtn = async () => {
        let isFormValid = this.checkForm();
        console.log(isFormValid);
        if (!isFormValid) {
            return;
        }

        try {
            const username = this.state.username.value;
            const password = this.state.password.value;
            console.log(username, password);
            
            const response = await Auth.signIn({
                username,
                password
            });
            console.log({response});

            this.props.history.push("/userProfile");
        } catch(error) {
            console.error(error);
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({ errMsg: err.message });
        }
    }

    checkForm = () => {
        const errMsg_username = this.checkUsername();
        const isValid_username = errMsg_username.length === 0;
        this.setState_byValidateResult("username", isValid_username, errMsg_username);

        const errMsg_password = this.checkPassword();
        const isValid_password = errMsg_password.length === 0;
        this.setState_byValidateResult("password", isValid_password, errMsg_password);

        const isFormValid = isValid_username && isValid_password;
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