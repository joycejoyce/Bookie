import getDBApi from './DBHandlers/DBApiGetter.js';

export default async function get(auth) {
    // const userId = "test";
    // const params = {
        
    //     ExpressionAttributeNames: {
    //         "#UID": "UserId",
    //         "#TO_READ": "ToRead",
    //         "#HAVE_READ": "HaveRead"
    //     },
    //     ExpressionAttributeValues: {
    //         ":userId": {
    //             S: username
    //         }
    //         ":attrStr": {
    //             S: "BookInfo"
    //         }
    //     },
    //     KeyConditionExpression: "#UID = :userId AND begins_with(#ATTR, :attrStr)",
    //     // FilterExpression: "begins_with(#ATTR, :attrStr)",
    //     ProjectionExpression: "#UID, #ATTR, #VAL",
        
    // }
    // const dbApi = getDBApi();
    // dbApi.query(params, (err, data) => {
    //     if (err) {
    //         console.error(`Unable to getItem from table '${params.TableName}'`, JSON.stringify(err, null, 2));
    //     }
    //     else {
    //         console.log(`Successfully getItem from table '${params.TableName}'`, JSON.stringify(data, null, 2));
    //     }
    // });

}