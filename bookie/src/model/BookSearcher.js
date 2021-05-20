import { Msg_UnexpectedSearchCond } from "../components/Message.js";
import { sendReq_GET } from "./HttpReqSender.js";

const queryParam = {
    author: "inauthor",
    title: "intitle",
    subject: "subject",
    publisher: "inpublisher",
    isbn: "isbn"
};

export default function search(conditions) {
    const {keyword, condition} = conditions;
    console.log({keyword, condition});
    let searchResult = null;
    if ((condition === "author" ||
        condition === "title" ||
        condition === "subject" ||
        condition === "publisher" ||
        condition === "isbn") && 
        keyword && keyword.length > 0) {
        searchResult = getSearchResult(keyword, condition);
    }
    else {
        console.error(Msg_UnexpectedSearchCond, {keyword, condition});
    }

    return searchResult;
}

function getSearchResult(keyword, condition) {
    const condStr = getCondStr(keyword, condition);
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + condStr;
    const ret = sendReq_GET(url);
    return ret;
}

function getCondStr(keyword, condition) {
    const param = queryParam[condition];
    const condStr = param + ":" + encodeURIComponent(keyword);
    return condStr;
}