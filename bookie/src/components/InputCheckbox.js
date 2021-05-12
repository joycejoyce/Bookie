import { Component } from "react";
import "../scss/InputCheckbox.scss";

class InputCheckbox extends Component {
    render() {
        const {id, label} = this.props;

        return(
            <div className="inputCheckbox">
                <input type="checkbox" id={id} />
                <label htmlFor={id}>{label}</label>
                <div className="boxWrapper"></div>
            </div>
        );
    }
}

export default InputCheckbox;