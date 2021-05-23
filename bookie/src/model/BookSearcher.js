import { lighten } from "@material-ui/core";
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
    console.log("BookSearcher", conditions);
    let { searchKeyword, searchCondition } = conditions;
    let searchResult = null;
    if ((searchCondition === "author" ||
        searchCondition === "title" ||
        searchCondition === "subject" ||
        searchCondition === "publisher" ||
        searchCondition === "isbn") && 
        searchKeyword && searchKeyword.length > 0) {
        const useAsync = false;
        searchResult = getSearchResult(conditions, useAsync);
    }
    else {
        console.error(Msg_UnexpectedSearchCond, {keyword: searchKeyword, condition: searchCondition});
    }

    return searchResult;
}

function getSearchResult(conditions, useAsync) {
    const condStr = getCondStr(conditions);
    const url = "https://www.googleapis.com/books/v1/volumes?" + condStr;
    const ret = sendReq_GET(url);
    return ret;
}

function getCondStr(conditions) {
    const { searchKeyword, searchCondition, startIndex, maxResults } = conditions;
    const param = queryParam[searchCondition];
    const condStr = `q=${param}:${encodeURIComponent(searchKeyword)}&startIndex=${startIndex}&maxResults=${maxResults}`;
    return condStr;
}