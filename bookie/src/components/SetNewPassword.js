import "../scss/AccountSaver.scss";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { validatePwd } from "./utility/FormValidator.js";

export default function ForgotPasswordVerification(props) {
    const email = props.location.state && props.location.state.email ? props.location.state.email : "";
    const [info, setInfo] = useState({
        vCode: "",
        newPwd: "",
        confirmPwd: ""
    });
    const [errMsg, setErrMsg] = useState({
        vCode: "",
        newPwd: "",
        confirmPwd: "",
        submit: ""
    });

    const handleOnChange = (e, name) => {
        const { value } = e.target;
        switch (name) {
            case 'vCode':
                setInfo({ ...info, vCode: value });
                break;
            case 'newPwd':
                setInfo({ ...info, newPwd: value });
                break;
            case 'confirmPwd':
                setInfo({ ...info, confirmPwd: value });
                break;
        }
    }

    const handleOnClickSubmit = async () => {
        console.log({info});
        let msg = {
            vCode: "",
            newPwd: "",
            confirmPwd: "",
            submit: ""
        };
        msg.vCode = info.vCode ? "" : "Please enter the verification code";
        msg.newPwd = validatePwd(info.newPwd);
        msg.confirmPwd = info.newPwd === info.confirmPwd ? "" : "Confirm password is not consistent with password";
        msg.submit = email ? "" : "No email address specified";
        if (msg.vCode || msg.newPwd || msg.confirmPwd || msg.submit) {
            setErrMsg(msg);
            return;
        }

        try {
            await Auth.forgotPasswordSubmit(
                props.location.state.email,
                info.vCode,
                info.newPwd
            );
            props.history.push("/changePasswordConfirm");
        } catch (error) {
            console.log(error);
            setErrMsg({...errMsg, submit: error.message});
        }
    }

    return (
        <div className="accountSaver">
            <div className="contents">
                <h2>Set new password</h2>
                <p>
                    Please enter the verification code sent to your email address ({email || "No email specified"}) and a new password.
                </p>
                <div className="inputSection">
                    <div className="errMsg submitErrMsg">{errMsg.submit}</div>
                    <div className="textField">
                        <TextField
                            label="Verification code"
                            variant="outlined"
                            onChange={(e) => handleOnChange(e, "vCode")}
                        />
                        <div className="errMsg">{errMsg.vCode}</div>
                    </div>
                    <div className="textField">
                        <TextField
                            label="New password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => handleOnChange(e, "newPwd")}
                        />
                        <div className="errMsg">{errMsg.newPwd}</div>
                    </div>
                    <div className="textField">
                        <TextField
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            onChange={(e) => handleOnChange(e, "confirmPwd")}
                        />
                        <div className="errMsg">{errMsg.confirmPwd}</div>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleOnClickSubmit}
                        color="primary"
                        size="large"
                    >
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    )
}