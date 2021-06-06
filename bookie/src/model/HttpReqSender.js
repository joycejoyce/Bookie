import axios from 'axios';

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

export async function sendReq_GET(url, useAsync) {
    console.log({ url });
    let ret = {
        isNormalEnd: false,
        errMsg: "No response",
        response: null
    };

    try {
        url="xxx";
        const response = await axios.get(url);
        console.log({ response });
        ret = {
            isNormalEnd: true,
            errMsg: "",
            response: response.data
        }
    } catch(err) {
        console.log("axios.get error:", err);
        ret = {
            isNormalEnd: false,
            errMsg: err,
            response: null
        }
    }

    return ret;
}

// export async function sendReq_GET(url, useAsync) {
//     console.log({url});
//     let ret = {
//         isNormalEnd: true,
//         errMsg: "",
//         response: null
//     };

//     let httpRequest = new XMLHttpRequest();
//     if (!httpRequest) {
//         console.error(Msg_CreateReqFail);
//         ret.isNormalEnd = false;
//         ret.errMsg = Msg_CreateReqFail;
//         return ret;
//     }

//     httpRequest.onreadystatechange = () => handleOnStateChange(ret, httpRequest);
    
//     httpRequest.open("GET", url, useAsync);
//     httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     httpRequest.send();

//     return globalRet;
// }

// function handleOnStateChange(ret, req) {
//     if (req.readyState === XMLHttpRequest.DONE) {
//         if (req.status === StatusCode_NormalEnd) {
//             ret.response = JSON.parse(req.responseText);
            
//         } else {
//             console.error(Msg_ReqNotNormalEnd);
//             ret.isNormalEnd = false;
//             ret.errMsg = Msg_ReqNotNormalEnd + ` (statusCode = ${req.status.toString()})`;
//         }
//     }

//     globalRet = ret;
// }