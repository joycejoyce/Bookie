import { sendReq_GET } from "./HttpReqSender.js";
const queryParam = {
    author: "inauthor",
    title: "intitle",
    subject: "subject",
    publisher: "inpublisher",
    isbn: "isbn"
}

export default function search(conditions) {
    const {keyword, checkAuthor, checkTitle, checkSubject, checkPublisher, checkIsbn} = conditions;
    const searchResult_author = getSearchResult(keyword, "author", checkAuthor);
    const searchResult_title = getSearchResult(keyword, "title", checkTitle);
    const searchResult_subject = getSearchResult(keyword, "subject", checkSubject);
    const searchResult_publisher = getSearchResult(keyword, "publisher", checkPublisher);
    const searchResult_isbn = getSearchResult(keyword, "isbn", checkIsbn);
}

function getSearchResult(keyword, category, shouldCheck) {
    if (!shouldCheck) {
        return null;
    }

    const condStr = getCondStr(keyword, category);
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + condStr;
    const ret = sendReq_GET(url);
    return ret;
}

function getCondStr(keyword, category) {
    const param = queryParam[category];
    const condStr = param + ":" + encodeURIComponent(keyword);
    return getSearchResult(condStr);
}