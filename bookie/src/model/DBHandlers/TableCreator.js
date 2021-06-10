import getDBApi from './DBApiGetter.js';

const dbApi = getDBApi();

export default async function createTable(params) {
    const { TableName } = params;
    const result_tableExists = await checkTableExists(TableName);
    if (!result_tableExists.isNormalEnd) {
        return result_tableExists;
    }
    if (result_tableExists.isNormalEnd && result_tableExists.exists) {
        console.log(`Table [${TableName}] exists`);
        return result_tableExists;
    }
    
    const result = {
        isNormalEnd: true,
        msg: ""
    };
    try {
        const data = await dbApi.createTable(params).promise();
        result.isNormalEnd = true;
        result.msg = JSON.stringify(data, null, 2);
        await new Promise(r => setTimeout(r, 5000));
    } catch (err) {
        result.isNormalEnd = false;
        result.msg = JSON.stringify(err, null, 2);
    }

    return result;
}

export function getParams(TableName) {
    let params = null;
    switch (TableName) {
        case 'Book':
            params = getParams_BookAndUser(TableName);
            break;
        case 'User':
            params = getParams_BookAndUser(TableName);
            break;
        case 'UserRate':
            params = getParams_UserRate();
            break;
        default:
            const msg = `Unexpected TableName [${TableName}]`;
            console.error(msg);
            break;
    }
    return params;
}

const ProvisionedThroughput = {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
};

function getParams_BookAndUser(TableName) {
    const KeySchema = [
        {
            AttributeName: "ID",
            KeyType: "HASH"
        }
    ];
    const AttributeDefinitions = [
        {
            AttributeName: "ID",
            AttributeType: "S"
        }
    ];
    const params = {
        TableName,
        KeySchema,
        AttributeDefinitions,
        ProvisionedThroughput
    }
    return params;
}

function getParams_UserRate() {
    const TableName = "UserRate";
    const KeySchema = [
        {
            AttributeName: "userId",
            KeyType: "HASH"
        },
        {
            AttributeName: "bookId",
            KeyType: "RANGE"
        }
    ];
    const AttributeDefinitions = [
        {
            AttributeName: "userId",
            AttributeType: "S"
        },
        {
            AttributeName: "bookId",
            AttributeType: "S"
        }
    ];
    const params = {
        TableName,
        KeySchema,
        AttributeDefinitions,
        ProvisionedThroughput
    }
    return params;
}

async function checkTableExists(tableName) {
    const result = {
        isNormalEnd: true,
        msg: "",
        exists: false
    };
    try {
        const params = {};
        const { TableNames } = await dbApi.listTables(params).promise();
        result.isNormalEnd = true;
        result.msg = "";
        result.exists = TableNames.includes(tableName);
    } catch (err) {
        result.isNormalEnd = false;
        result.msg = JSON.stringify(err, null, 2);
    }

    return result;
}