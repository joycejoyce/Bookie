import "../scss/AccountSaver.scss";
import { Button } from "@material-ui/core";

export default function SetNewPasswordConfirm(props) {

    const handleOnClickSignIn = () => {
        props.history.push("/signIn");
    }

    return (
        <div className="accountSaver setNewPasswordConfirm">
            <div className="contents">
                <p className="msg">
                    Your password has been successfully updated!
                </p>
                <Button
                    variant="outlined"
                    onClick={handleOnClickSignIn}
                    color="primary"
                    size="large"
                >
                    Sign In
                </Button>
            </div>
        </div>
    )
}