import { Component } from "react";
import '../scss/SignIn.scss';
import InputText from "./utility/InputText.js";
import BtnSection from "./sub/BtnSection.js";
import { Auth } from "aws-amplify";
import { Msg_UsernameBlank, Msg_PasswordBlank } from "./utility/Message.js";
import { getClassName_init, getClassName_onSubmit } from "./utility/InputClassNameGetter.js";

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
        this.setState({ errMsg: "" });
    }

    handleOnClickLeftBtn = () => {
        this.props.history.push("/createAccount");
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
            
            const user = await Auth.signIn({
                username,
                password
            });
            console.log({user});

            const { history, auth } = this.props;
            auth.setUser(user);
            auth.setIsAuthenticated(true);
            history.push("/library");
        } catch(error) {
            console.error(error);
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({ errMsg: err.message });
        }
    }

    handleOnClickForgotPwd = () => {
        this.props.history.push("/forgotPassword");
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
        // console.log("render SignIn");
        // console.log("props", this.props);

        return (
            <div className="signIn">
                <div className="contents">
                    <h1>Sign In</h1>
                    <div className="formErrMsg">{this.state.errMsg}</div>
                    <div className="inputSection">
                        <InputText data={this.state.username} handleOnChange={this.handleOnChange} />
                        <InputText data={this.state.password} handleOnChange={this.handleOnChange} />
                    </div>
                    {/* <a href="/forgotPassword"><div className="forgotPwd">Forgot password?</div></a> */}
                    <div className="forgotPwd" onClick={this.handleOnClickForgotPwd}>Forgot password?</div>
                    <BtnSection leftBtnText="Create account"
                        handleClickOnLeftBtn={this.handleOnClickLeftBtn}
                        handleOnClickRightBtn={this.handleOnClickRightBtn}
                    />
                </div>
            </div>
        );
    }
}

export default SignIn;