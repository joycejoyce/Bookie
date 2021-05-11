const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";

export function handleInputOnFocus(e) {
    console.log("onFocus");
    let targetElem = e.target.parentElement;
    targetElem.className = ClassName_inputText + " " + ClassName_inputTextOnFocus;
}

export function handleInputOnBlur(e) {
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