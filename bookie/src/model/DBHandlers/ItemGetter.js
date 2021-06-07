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

export function getParams(data, tableName) {
    switch (tableName) {
        case 'User':
            return getParams_User(data);
        default:
            return null;
    }
}

function getParams_User({ auth }) {
    // const { username } = auth;
    const username = "test";
    const params = {
        TableName: "User",
        Key: {
            ID: {
                S: username
            }
        },
        ExpressionAttributeNames: {
            "#ID": "ID",
            "#ToRead": "ToRead",
            "#HaveRead": "HaveRead"
        },
        ProjectionExpression: '#ID, #ToRead, #HaveRead'
    };

    return params;
}