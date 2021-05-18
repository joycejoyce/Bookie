import { Component } from "react";
import Logo from "./Logo.js";
import Menu from "./Menu.js";
import '../scss/Navbar.scss';

class Navbar extends Component {
    render() {
        return (
            
            <div className="navbar">
                <div className="contents">
                    <Logo className="logo" />
                    <Menu className="menu" />
                </div>
            </div>
        );
    }
}

export default Navbar;