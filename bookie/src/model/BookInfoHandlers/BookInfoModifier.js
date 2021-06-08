import update, { getParams } from '../DBHandlers/ItemUpdater.js';

export async function modifyBookInfo_toRead(data, action) {
    let result = null;
    switch (action) {
        case 'delete':
            result = await modifyBookInfo_delete(data);
            break;
        default:
            break;
    }
    return result;
}

async function modifyBookInfo_delete({ auth, checkedItemIds }) {
    console.log({ auth, checkedItemIds });
    const resultList_User = [];
    for (let i in checkedItemIds) {
        const id = checkedItemIds[i];
        const bookInfo = {
            id,
            toRead: false,
            haveRead: null
        };
        const params = getParams(auth, bookInfo, "User");
        const [ params_toRead ] = params;
        const result = update(params_toRead);
        resultList_User.push(result);
    }

    const result = {};

    await Promise.all(resultList_User).then(results => {
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
    });

    return result;
}