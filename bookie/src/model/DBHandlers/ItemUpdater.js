import getDBApi from './DBApiGetter.js';
import { NoImgPath } from '../../config.json';

const dbApi = getDBApi();

export default async function update(params) {
    console.log("update()");
    const result = {
        isNormalEnd: true,
        msg: ""
    };
    
    try {
        const data = await dbApi.updateItem(params).promise();
        result.isNormalEnd = true;
        result.msg = JSON.stringify(data, null, 2);
    } catch (err) {
        result.isNormalEnd = false;
        result.msg = JSON.stringify(err, null, 2);
    }

    return result;
}

export function getParams(auth, bookInfo, tableName) {
    switch (tableName) {
        case 'User': 
            return getParams_User(auth, bookInfo);
        case 'Book': 
            return getParams_Book(bookInfo);
        default: 
            return null;
    }
}

function getParams_User(auth, bookInfo) {
    const ID = auth.username;
    const bookId = bookInfo.id;
    const { toRead, haveRead } = bookInfo;
    const action = {
        toRead: toRead ? "ADD" : "DELETE",
        haveRead: haveRead ? "ADD" : "DELETE"
    };
    const commonParams = {
        TableName: "User",
        Key: {
            ID: {
                S: ID
            }
        },
        ReturnValues: "ALL_NEW"
    };
    const params = [
        {
            ...commonParams,
            ExpressionAttributeNames: {
                "#ToRead": "ToRead",
            },
            ExpressionAttributeValues: {
                ":ToRead": {
                    SS: [bookId]
                }
            },
            UpdateExpression: `${action.toRead} #ToRead :ToRead`
        },
        {
            ...commonParams,
            ExpressionAttributeNames: {
                "#HaveRead": "HaveRead"
            },
            ExpressionAttributeValues: {
                ":HaveRead": {
                    SS: [bookId]
                }
            },
            UpdateExpression: `${action.haveRead} #HaveRead :HaveRead`
        }
    ]
    return params;
}

function getParams_Book(bookInfo) {
    const { toRead, haveRead } = bookInfo;
    // const action = toRead||haveRead ? "SET" : "REMOVE";
    const action = "SET";
    const params = action === "SET" ? getParams_Book_SET(bookInfo) : getParams_Book_REMOVE(bookInfo);
    return params;
}

function getParams_Book_SET(bookInfo) {
    const bookInfoStr = getBookInfo(bookInfo);
    const params = {
        TableName: "Book",
        Key: {
            ID: {
                S: bookInfo.id
            }
        },
        ReturnValues: "ALL_NEW",
        ExpressionAttributeNames: {
            "#BookInfo": "BookInfo"
        },
        ExpressionAttributeValues: {
            ":BookInfo": {
                S: bookInfoStr
            }
        },
        UpdateExpression: "SET #BookInfo = :BookInfo"
    }
    return params;
}

function getBookInfo(bookInfo) {
    const { id, volumeInfo } = bookInfo;
    const { authors, categories, imageLinks, title } = volumeInfo;
    let thumbnail = imageLinks ? imageLinks.thumbnail : NoImgPath;
    const bookInfoStr = JSON.stringify({
        id,
        title,
        authors,
        categories,
        thumbnail
    }, null, 2);
    return bookInfoStr;
}

function getParams_Book_REMOVE(bookInfo) {
    const params = {
        TableName: "Book",
        Key: {
            ID: {
                S: bookInfo.id
            }
        },
        ReturnValues: "ALL_NEW",
        ExpressionAttributeNames: {
            "#BookInfo": "BookInfo"
        },
        UpdateExpression: "Remove #BookInfo"
    }
    return params;
}