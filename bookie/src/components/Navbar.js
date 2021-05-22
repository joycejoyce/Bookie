import { Component } from "react";
import Logo from "./icon/Logo.js";
import SvgIcon from '@material-ui/core/SvgIcon';
import '../scss/Navbar.scss';

const menuStyle = {
    fontSize: "clamp(24px, 4vmin, 32px)",
    color: "#073B4C"
};

function MenuIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </SvgIcon>
    );
}

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="contents">
                    <Logo className="logo" />
                    <MenuIcon id="menuIcon" style={menuStyle} />
                </div>
            </div>
        );
    }
}

export default Navbar;