import { Component } from "react";
import '../InputText.scss';
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
        const {id, label} = this.props;
        console.log({id, label});
        return(
            <div id={id} className="inputText inputTextOnBlur">
                <label htmlFor={id}>{label}</label>
                <input type="text" id={id}
                onFocus={(e) => this.handleInputOnFocus(e)}
                onBlur={(e) => this.handleInputOnBlur(e)}/>
            </div>
        );
    }
}

export default InputText;