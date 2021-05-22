const StatusCode_NormalEnd = 200;
const Msg_CreateReqFail = "Failed to create XMLHttpRequest";
const Msg_ReqNotNormalEnd = "HTTP request return code not " + StatusCode_NormalEnd.toString();

let globalRet = null;

export function checkIsNormalEnd(ret) {
    return ret.errMsg.length === 0 && ret.statusCode === StatusCode_NormalEnd;
}

export function getResponse(ret) {
    return ret.response;
}

export function sendReq_GET(url, useAsync) {
    console.log({url});
    let ret = {
        errMsg: "",
        statusCode: -1,
        response: null
    };

    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        console.error(Msg_CreateReqFail);
        ret.errMsg = Msg_CreateReqFail;
        return ret;
    }

    httpRequest.onreadystatechange = () => handleOnStateChange(ret, httpRequest);
    
    httpRequest.open("GET", url, useAsync);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();

    return globalRet;
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

    globalRet = ret;
}