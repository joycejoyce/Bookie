import getDBApi from './DBApiGetter.js';

const dbApi = getDBApi();

export default async function get(params) {
    const result = {
        isNormalEnd: true,
        msg: ""
    };

    try {
        const data = await dbApi.getItem(params).promise();
        result.isNormalEnd = true;
        result.msg = JSON.stringify(data, null, 2);
    } catch (err) {
        result.isNormalEnd = false;
        result.msg = JSON.stringify(err, null, 2);
    }

    return result;
}

export async function scan(params) {
    const result = {
        isNormalEnd: true,
        msg: ""
    };

    try {
        const data = await dbApi.scan(params).promise();
        result.isNormalEnd = true;
        result.msg = JSON.stringify(data, null, 2);
    } catch (err) {
        result.isNormalEnd = false;
        result.msg = JSON.stringify(err, null, 2);
    }

    return result;
}

export function getParams(data, tableName) {
    switch (tableName) {
        case 'User':
            return getParams_User(data);
        case 'UserRate':
            return getParams_UserRate(data);
        case 'Book':
            return getParams_Book();
        case 'Book_byId':
            return getPrams_Book_byId(data);
        default:
            return null;
    }
}

function getParams_User({ username }) {
    const params = {
        TableName: "User",
        Key: {
            ID: {
                S: username
            }
        },
        ExpressionAttributeNames: {
            "#ID": "ID",
            "#toRead": "toRead",
            "#haveRead": "haveRead"
        },
        ProjectionExpression: '#ID, #toRead, #haveRead'
    };

    return params;
}

function getParams_UserRate({ auth, bookInfo }) {
    const { username: userId } = auth;
    const { id: bookId } = bookInfo;
    const params = {
        TableName: "UserRate",
        Key: {
            userId: {
                S: userId
            },
            bookId: {
                S: bookId
            }
        },
        ExpressionAttributeNames: {
            "#userId": "userId",
            "#bookId": "bookId",
            "#rate": "rate",
            "#review": "review"
        },
        ProjectionExpression: '#userId, #bookId, #rate, #review'
    };

    return params;
}

function getParams_Book() {
    const params = {
        ExpressionAttributeNames: {
            "#BookInfo": "BookInfo",
            "#ID": "ID"
        },
        ProjectionExpression: "#ID, #BookInfo",
        TableName: "Book"
    };

    return params;
}

function getPrams_Book_byId(bookId) {
    const params = {
        TableName: "Book",
        Key: {
            ID: {
                S: bookId
            }
        },
        ExpressionAttributeNames: {
            "#ID": "ID",
            "#BookInfo": "BookInfo"
        },
        ProjectionExpression: "#ID, #BookInfo"
    };

    return params;
}