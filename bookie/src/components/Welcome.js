import { Component } from "react";
import Logo from "./Logo.js";
import '../scss/Welcome.scss';

class Welcome extends Component {
    render() {
        const { username, email } = this.props.location.state;
        return (
            <div className="welcome">
                <div className="contents">
                    <Logo />
                    <div className="welcomeTitle">Welcome, {username}!</div>
                    <div className="description">
                        An email with a verification link was just sent to {email}.
                        <br /><br />
                        After clicking the link, you may come back and sign in.
                    </div>
                    <button className="signInBtn">Sign in</button>
                </div>
            </div>
        );
    }
}

export default Welcome;