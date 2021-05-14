import { Component } from "react";
import "../scss/InputText.scss";
import { getClassName_onFocus, getClassName_onBlur } from "./InputClassNameGetter.js";

class InputText extends Component {
    handleOnFocus = (e, data) => {
        const {isValid} = data;
        const className = getClassName_onFocus(isValid);
        e.target.parentElement.className = className;
    }

    handleOnBlur = (e, data) => {
        const {isValid, value} = data;
        const className = getClassName_onBlur(isValid, value);
        e.target.parentElement.className = className;
    }

    render() {
        const {data, handleOnChange} = this.props;
        const {name, value, type, label, errMsg, className} = data;

        return(
            <div id={name} className={className}>
                <label htmlFor={name}>{label}</label>
                <input id={name} value={value} type={type}
                onFocus={(e) => this.handleOnFocus(e, data)}
                onChange={handleOnChange}
                onBlur={(e) => this.handleOnBlur(e, data)} />
                <div className="errMsg">{errMsg}</div>
            </div>
        );
    }
}

export default InputText;