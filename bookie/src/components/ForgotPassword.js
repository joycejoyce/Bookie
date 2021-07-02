import "../scss/AccountSaver.scss";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { validateEmail } from "../utility/FormValidator.js";

export default function ForgotPassword(props) {
    const [email, setEmail] = useState();
    const [errMsg, setErrMsg] = useState();

    const handleOnChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        setErrMsg("");
    }

    const handleOnClickSubmit = async () => {
        const msg = validateEmail(email);
        if (msg.length > 0) {
            setErrMsg(msg);
            return;
        }

        try {
            await Auth.forgotPassword(email);
            props.history.push({
                pathname: '/setNewPassword',
                state: { email }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="accountSaver">
            <div className="contents">
                <h2>Forgot your password?</h2>
                <p>
                    Please enter the email address associated with your account and we'll email you a password reset code.
                </p>
                <div className="inputSection">
                    <div className="textField">
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={handleOnChange}
                        />
                        <div className="errMsg">{errMsg}</div>
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleOnClickSubmit}
                        color="primary"
                        size="large"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}