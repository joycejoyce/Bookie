import getItem, { getParams } from '../DBHandlers/ItemGetter.js';

export default async function getBookInfo(classification, auth) {
    const params_User = getParams(auth, "User");
    const result_User = await getItem(params_User);
    // console.log({ result_User });
    if (!result_User.isNormalEnd) {
        return result_User;
    }

    const result = {
        isNormalEnd: true,
        msg: "No data",
        items: []
    }

    const result_User_info = JSON.parse(result_User.msg);
    if (!result_User_info.Item || !result_User_info.Item[classification]) {
        return result;
    }
    const { SS } = result_User_info.Item[classification];
    const bookIds = SS;
    // console.log(bookIds);
    const resultList_Book = [];
    for (let i in bookIds) {
        const bookId = bookIds[i];
        const params_Book = getParams(bookId, "Book_byId");
        const result_Book = getItem(params_Book);
        resultList_Book.push(result_Book);
    }
    let items = [];
    await Promise.all(resultList_Book).then(results => {
        // console.log({ result });
        items = getItems_byQueryResult(results);
    });
    
    result.isNormalEnd = true;
    result.msg = "";
    result.items = items;

    return result;
}

function getItems_byQueryResult(results) {
    const items = results.reduce((accu, result) => {
        const { msg } = result;
        const msgObj = JSON.parse(msg);
        const bookInfoStr = msgObj.Item.BookInfo.S;
        const bookInfo = JSON.parse(bookInfoStr);
        console.log({ bookInfo });
        const key = bookInfo.id;
        const value = {
            id: bookInfo.id,
            checked: false,
            title: bookInfo.title,
            author: bookInfo.authors.join(', '),
            thumbnail: bookInfo.thumbnail
        };
        accu = {
            ...accu,
            [key]: value
        }
        return accu;
    }, {});
    return items;
}