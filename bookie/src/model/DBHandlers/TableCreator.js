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
    const ProvisionedThroughput = {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    };
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