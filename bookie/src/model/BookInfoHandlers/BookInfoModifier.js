import update, { getParams } from '../DBHandlers/ItemUpdater.js';
import { viewResult_User } from '../DBHandlers/ItemViewer.js';

export async function modifyBookInfo(data) {
    let result = null;
    const { action } = data;
    switch (action) {
        case 'delete':
            result = await modifyBookInfo_delete(data);
            break;
        case 'moveToHaveRead':
            result = await modifyBookInfo_moveToHaveRead(data);
        default:
            break;
    }
    return result;
}

async function modifyBookInfo_delete({ auth, checkedItemIds, classification }) {
    // console.log({ auth, checkedItemIds });
    const resultList_User = [];
    const index = {
        'ToRead': 0,
        'HaveRead': 1
    };
    const theIndex = index[classification];
    for (let i in checkedItemIds) {
        const id = checkedItemIds[i];
        const bookInfo = {
            id,
            [classification]: false
        };
        const paramList = getParams(auth, bookInfo, "User");
        const params = paramList[theIndex];
        const result = update(params);
        resultList_User.push(result);
        // const bookInfo = {
        //     id,
        //     toRead: false,
        //     haveRead: null
        // };
        // const params = getParams(auth, bookInfo, "User");
        // const [ params_toRead ] = params;
        // const result = update(params_toRead);
        // resultList_User.push(result);
    }

    const result = {};
    await Promise.all(resultList_User).then(results => {
        setResult_byEachDBOperations(results, result);
    });

    return result;
}

function setResult_byEachDBOperations(results, result) {
    const isNormalEnd = results.reduce((accu, result) => {
        const { isNormalEnd } = result;
        return accu && isNormalEnd;
    }, true);
    let msg = "";
    if (!isNormalEnd) {
        const msgObj = results.reduce((accu, result, i) => {
            const { msg } = result;
            accu[i] = msg;
            return accu;
        }, {});
        msg = JSON.stringify(msgObj, null, 2);
    }

    result.isNormalEnd = isNormalEnd;
    result.msg = msg;
}

async function modifyBookInfo_moveToHaveRead({ auth, checkedItemIds }) {
    // console.log({ auth, checkedItemIds });
    const resultList_User = [];
    for (let i in checkedItemIds) {
        const id = checkedItemIds[i];
        const bookInfo = {
            id,
            toRead: false,
            haveRead: true
        };
        const params = getParams(auth, bookInfo, "User");
        const [ params_toRead, params_haveRead ] = params;
        const result_toRead = update(params_toRead);
        resultList_User.push(result_toRead);
        const result_haveRead = update(params_haveRead);
        resultList_User.push(result_haveRead);
    }

    const result = {};
    await Promise.all(resultList_User).then(results => {
        setResult_byEachDBOperations(results, result);
    });

    await viewResult_User(auth);

    return result;
}