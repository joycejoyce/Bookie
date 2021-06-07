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