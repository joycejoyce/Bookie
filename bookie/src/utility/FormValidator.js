export function validateEmail(s) {
    if(!s || !s.includes("@")) {
        return "Invalid email format";
    }
    return "";
}