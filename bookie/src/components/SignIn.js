import { Component } from "react";
import styled from '@emotion/styled';
import { ReactComponent as LogoImg } from '../assets/logo.svg';

const Logo = styled(LogoImg)`
    width: 90px;
`;

class SignIn extends Component {
    render() {
        return (
            <div className="signIn">
                <div className="contents">
                    <Logo />
                    <h1>Sign In</h1>
                    <input type="text" id="email" placeholder="Enter email address" />
                    <div className="btnSection">
                        <button className="createAccount">Create account</button>
                        <button className="next">Next</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;