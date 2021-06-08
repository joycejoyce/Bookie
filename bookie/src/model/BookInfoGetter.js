import getItem, { getParams } from './DBHandlers/ItemGetter.js';

export async function getBookInfo_toRead(auth) {
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
    if (!result_User_info.Item || !result_User_info.Item.ToRead) {
        return result;
    }
    const { SS } = result_User_info.Item.ToRead;
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
    // const items = numAry.reduce((accu, num) => {
    //     const numStr = num.toString();
    //     const key = "id".concat(numStr);
    //     const value = {
    //         checked: false,
    //         title: 'Title'.concat(' ', getRandomInt(100)),
    //         author: 'Author'.concat(' ', getRandomInt(100))
    //     };
    //     accu = {
    //         ...accu,
    //         [key]: value
    //     };
    //     return accu;
    // }, {});
    const items = results.reduce((accu, result) => {
        const { msg } = result;
        const msgObj = JSON.parse(msg);
        const bookInfoStr = msgObj.Item.BookInfo.S;
        const bookInfo = JSON.parse(bookInfoStr);
        const key = bookInfo.id;
        const value = {
            checked: false,
            title: bookInfo.title,
            author: bookInfo.authors.join(', ')
        };
        accu = {
            ...accu,
            [key]: value
        }
        return accu;
    }, {});
    return items;
}