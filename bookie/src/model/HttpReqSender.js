const StatusCode_NormalEnd = 200;
const Msg_CreateReqFail = "Failed to create XMLHttpRequest";
const Msg_ReqNotNormalEnd = "HTTP request return code not " + StatusCode_NormalEnd.toString();

export function sendReq_GET(url) {
    let ret = {
        retCode: -1,
        errMsg: "",
        statusCode: -1,
        response: null
    };

    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.error(Msg_CreateReqFail);
        ret.retCode = -1;
        ret.errMsg = Msg_CreateReqFail;
        return ret;
    }

    httpRequest.onreadystatechange = () => handleOnStateChange(ret, httpRequest);
    
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();

    return ret;
}

function handleOnStateChange(ret, req) {
    if (req.readyState === XMLHttpRequest.DONE) {
        ret.statusCode = req.status;
        if (req.status === StatusCode_NormalEnd) {
            ret.response = JSON.parse(req.responseText);
        } else {
            console.error(Msg_ReqNotNormalEnd);
            ret.errMsg = Msg_ReqNotNormalEnd;
        }
    }

    return ret;
}