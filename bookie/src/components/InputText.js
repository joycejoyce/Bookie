import { Component } from "react";
import '../scss/InputText.scss';
//import {handleInputOnFocus, handleInputOnBlur} from "../HandlInputTextEvents.js";

const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";

class InputText extends Component {
    handleInputOnFocus = (e) => {
        console.log("onFocus");
        let targetElem = e.target.parentElement;
        targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnFocus;
    }
    
    handleInputOnBlur = (e) => {
        console.log("OnBlur");
        const value = e.target.value;
        let targetElem = e.target.parentElement;
        if (value.length === 0) {
            targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnBlur;
        }
        else {
            targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnBlur_hasText;
        }
    }

    render() {
        const {id, type, label, onChange} = this.props;
        return(
            <div id={id} className="inputText inputTextOnBlur">
                <label htmlFor={id}>{label}</label>
                <input id={id} type={type}
                onFocus={(e) => this.handleInputOnFocus(e)}
                onBlur={(e) => this.handleInputOnBlur(e)}
                onChange={(e) => onChange(e)}/>
            </div>
        );
    }
}

export default InputText;