import { lighten } from "@material-ui/core";
import { Msg_UnexpectedSearchCond } from "../components/utility/Message.js";
import { sendReq_GET } from "./HttpReqSender.js";

const queryParam = {
    author: "inauthor",
    title: "intitle",
    subject: "subject",
    publisher: "inpublisher",
    isbn: "isbn"
};

export default async function searchAll(conditions) {
    console.log("BookSearcher(all)", conditions);
    // searchConditions: {
    //     keyword: "",
    //     condition: "",
    //     startIndex: 0,
    //     maxResults: displayRowsPerPage
    // }
    // ret = {
    //     isNormalEnd: true,
    //     errMsg: "",
    //     response: null
    // }
    const modifiedConditions = {
        ...conditions,
        startIndex: 0,
        maxResults: 40
    };
    const searchResult = {
        isNormalEnd: true,
        errMsg: "",
        response: { items: [] }
    };
    while (true) {
        let tmpSearchResult = await search(modifiedConditions);
        console.log({tmpSearchResult});
        if (!tmpSearchResult.isNormalEnd) {
            break;
        }
        const { items } = tmpSearchResult.response;
        if (!items) {
            break;
        }
        if (modifiedConditions.startIndex === 0) {
            searchResult.response.totalItems = tmpSearchResult.response.totalItems;
        }
        searchResult.response.items = [...searchResult.response.items, ...items];
        modifiedConditions.startIndex = modifiedConditions.startIndex + modifiedConditions.maxResults;
    }
    console.log({searchResult});

    return searchResult;
}

export async function search(conditions) {
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
        searchResult = await getSearchResult(conditions, useAsync);
    }
    else {
        console.error(Msg_UnexpectedSearchCond, {keyword: searchKeyword, condition: searchCondition});
    }

    return searchResult;
}

async function getSearchResult(conditions, useAsync) {
    const condStr = getCondStr(conditions);
    const url = "https://www.googleapis.com/books/v1/volumes?" + condStr;
    const ret = await sendReq_GET(url, useAsync);
    return ret;
}

function getCondStr(conditions) {
    const { searchKeyword, searchCondition, startIndex, maxResults } = conditions;
    const param = queryParam[searchCondition];
    const condStr = `q=${param}:${encodeURIComponent(searchKeyword)}&startIndex=${startIndex}&maxResults=${maxResults}`;
    return condStr;
}