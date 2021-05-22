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
    const { searchKeyword, searchCondition } = conditions;
    console.log({searchKeyword, searchCondition});
    let searchResult = null;
    if ((searchCondition === "author" ||
        searchCondition === "title" ||
        searchCondition === "subject" ||
        searchCondition === "publisher" ||
        searchCondition === "isbn") && 
        searchKeyword && searchKeyword.length > 0) {
        const useAsync = false;
        searchResult = getSearchResult(searchKeyword, searchCondition, useAsync);
    }
    else {
        console.error(Msg_UnexpectedSearchCond, {keyword: searchKeyword, condition: searchCondition});
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