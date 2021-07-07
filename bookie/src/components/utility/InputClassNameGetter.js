const ClassName_inputText = "inputText";
const ClassName_inputTextOnFocus = "inputTextOnFocus";
const ClassName_inputTextOnBlur = "inputTextOnBlur";
const ClassName_inputTextOnBlur_hasText = "inputTextOnBlur_hasText";
const ClassName_showErr = "showErr";

export function getClassName_init() {
    let classList = [ClassName_inputText, ClassName_inputTextOnBlur];
    const className = classList.join(" ");
    return className;
}

export function getClassName_onFocus(isValid) {
    let classList_init = [ClassName_inputText, ClassName_inputTextOnFocus];
    let classList = getClassList_byIsValid(isValid, classList_init);
    const className = classList.join(" ");
    return className;
}

export function getClassName_onBlur(isValid, value) {
    let classList_init = [ClassName_inputText];
    let classList = getClassList_byIsValid(isValid, classList_init);
    if (!isValid) {
        classList.push(ClassName_inputTextOnFocus)
    }
    else {
        if (value.length === 0) {
            classList.push(ClassName_inputTextOnBlur);
        }
        else {
            classList.push(ClassName_inputTextOnBlur_hasText);
        }
    }
    const className = classList.join(" ");
    return className;
}

export function getClassName_onSubmit(isValid) {
    const classList_init = [ClassName_inputText, ClassName_inputTextOnFocus];
    const classList = getClassList_byIsValid(isValid, classList_init);
    const className = classList.join(" ");
    return className;
}

function getClassList_byIsValid(isValid, classList_input) {
    let classList = [];

    if (isValid) {
        classList = classList_input.filter(c => c !== ClassName_showErr);
    }
    else {
        classList = [...classList_input, ClassName_showErr];
    }

    return classList;
}