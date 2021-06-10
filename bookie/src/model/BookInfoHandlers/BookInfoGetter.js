import getItem, { getParams } from '../DBHandlers/ItemGetter.js';
import { names as ratingNames, types as ratingTypes, defaultValue as ratingDefaultValue } from '../../components/library/Rater.js';

export const classifications = {
    toRead: "toRead",
    haveRead: "haveRead"
};

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
    let items = {};
    await Promise.all(resultList_Book).then(results => {
        // console.log({ result });
        const items_bookInfo = getItems_byBookInfo(results);
        items = items_bookInfo;
    });

    if (classification === classifications.haveRead) {
        const resultList_UserRate = [];
        for (let i in bookIds) {
            const bookId = bookIds[i];
            const bookInfo = { id: bookId };
            const params = getParams({auth, bookInfo}, "UserRate");
            const result = getItem(params);
            resultList_UserRate.push(result);
        }
        await Promise.all(resultList_UserRate).then(results => {
            const items_ratingInfo = getItems_byRatingInfo(bookIds, results, items);
            items = items_ratingInfo;
        });
    }
    
    result.isNormalEnd = true;
    result.msg = "";
    result.items = items;

    return result;
}

function getItems_byBookInfo(results) {
    const items = results.reduce((accu, result) => {
        const { msg } = result;
        const msgObj = JSON.parse(msg);
        const bookInfoStr = msgObj.Item.BookInfo.S;
        const bookInfo = JSON.parse(bookInfoStr);
        // console.log({ bookInfo });
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

function getItems_byRatingInfo(bookIds, results, items) {
    console.log({ bookIds, results, items });
    const ratingInfoList = getRatingInfo_byQueryResult(results);
    const modifiedItems = Object.keys(items).reduce((accu, bookId) => {
        let ratingInfo = ratingInfoList[bookId];
        if (!ratingInfo) {
            ratingInfo = ratingDefaultValue;
        }
        const item = items[bookId];
        const modifiedItem = {...item, ...ratingInfo};
        accu[bookId] = modifiedItem;
        return accu;
    }, {});
    // console.log({ items });
    // console.log({ modifiedItems });
    return modifiedItems;
}

function getRatingInfo_byQueryResult(results) {
    // console.log("getRatingInfo_byQueryResult");
    // console.log({results});
    const info = results.reduce((accu, result) => {
        const { isNormalEnd, msg } = result;
        if (!isNormalEnd || !msg) {
            return accu;
        }

        const msgObj = JSON.parse(msg);
        // console.log({msgObj});
        const { Item } = msgObj;
        if (!Item) {
            return accu;
        }
        // console.log({Item});

        const bookId = Item.bookId.S;
        // console.log({bookId});
        accu[bookId] = {};
        ratingNames.forEach(name => {
            // console.log({name});
            const obj = Item[name];
            // console.log({obj});
            const type = ratingTypes[name];
            // console.log({type});
            let value = null;
            if (obj) {
                value = obj[type];
            }
            else {
                value = ratingDefaultValue[name];
            }
            // console.log({value});
            if (type === 'N') {
                value = parseInt(value);
            }

            accu[bookId][name] = value;
        });

        return accu;
    }, {});
    console.log({info});
    return info;
}