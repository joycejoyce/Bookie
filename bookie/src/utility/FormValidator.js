export function validateEmail(s) {
    if(!s || !s.includes("@")) {
        return "Invalid email format";
    }
    return "";
}

export function validatePwd(s) {
    if(!s) {
        return "Please enter password";
    }
    if(s.length < 8) {
        return "Password should contains at least 8 characters";
    }
    return "";
}