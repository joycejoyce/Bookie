import { Component } from "react";
import "../scss/InputText.scss";
import { ClassName_ShowErr } from "./DynamicClassName.js";
//import {handleInputOnFocus, handleInputOnBlur} from "../HandlInputTextEvents.js";

// const ClassName_inputText = "inputText";
// const ClassName_inputTextOnFocus = "inputTextOnFocus";
// const ClassName_inputTextOnBlur = "inputTextOnBlur";
// const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";

class InputText extends Component {
    // handleInputOnFocus = (e) => {
    //     let targetElem = e.target.parentElement;

    //     // initialize
    //     targetElem.className = ClassName_inputText;
    //     targetElem.classList.add(ClassName_inputTextOnFocus);
        
    //     const hasClass_showErr = targetElem.classList.contains(ClassName_ShowErr);
    //     if (hasClass_showErr) {
    //         targetElem.classList.add(ClassName_ShowErr);
    //     }
    // }
    
    // handleInputOnBlur = (e) => {
    //     let targetElem = e.target.parentElement;

    //     // initialize
    //     targetElem.className = ClassName_inputText;

    //     const hasClass_showErr = targetElem.classList.contains(ClassName_ShowErr);
    //     if (hasClass_showErr) {
    //         targetElem.classList.add(ClassName_inputTextOnFocus);
    //         targetElem.classList.add(ClassName_ShowErr);
    //     }
    //     else {
    //         const value = e.target.value;
    //         if (value.length === 0) {
    //             targetElem.classList.add(ClassName_inputTextOnBlur);
    //         }
    //         else {
    //             targetElem.classList.add(ClassName_inputTextOnBlur_hasText);
    //         }
    //     }
    // }

    // handleOnChange = (e, onChange) => {
    //     console.log("onChange1");
    //     let targetElem = e.target.parentElement;
    //     targetElem.className = ClassName_inputText;
    //     targetElem.classList.add(ClassName_inputTextOnFocus);
    //     onChange(e);
    // }

    // getClassName = (id, value, errMsg) => {
    //     console.log("getClassName");
    //     console.log({errMsg});
    //     let classNameList = [ClassName_inputText];

    //     if (value.length !== 0) {
    //         classNameList.push(ClassName_inputTextOnFocus);
    //     }
    //     else {
    //         const targetElem = document.querySelector("#" + id);
    //         if (!targetElem) {
    //             classNameList.push(ClassName_inputTextOnBlur);
    //         }
    //         else {
    //             const isFocused = this.checkIsFocused(targetElem);
    //             if (isFocused) {
    //                 classNameList.push(ClassName_inputTextOnFocus);
    //             }
    //             else {
    //                 classNameList.push(ClassName_inputTextOnBlur);
    //             }
    //         }
    //     }

    //     if (errMsg.length !== 0) {
    //         classNameList.push(ClassName_ShowErr);
    //     }

    //     const className = classNameList.join(" ");

    //     return className;
    // }

    // checkIsFocused = (targetElem) => {
    //     const inputElem = targetElem.querySelector("input");
    //     return (document.activeElement === inputElem);
    // }

    render() {
        console.log("render");
        const {id, className, value, type, label, errMsg, onChange, onFocus, onBlur} = this.props;
        const finalErrMsg = errMsg ? errMsg : "";
        //const className = this.getClassName(id, value, finalErrMsg);
        return(
            <div id={id} className={className}>
                <label htmlFor={id}>{label}</label>
                <input id={id} value={value} type={type}
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)} />
                <div className="errMsg">{finalErrMsg}</div>
            </div>
        );
    }
}

export default InputText;