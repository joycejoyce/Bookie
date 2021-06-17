import { DBConfig } from "../../config.json";
import AWS from "aws-sdk";

let dbApi = null;
export default function getDBApi() {
    if (dbApi) {
        console.log("dbApi already exists");
        return dbApi;
    }

    try {
        console.log("going to create dbApi...");
        const { region, IdentityPoolId } = DBConfig;
        const config = {
            region,
            credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId})
        };

        AWS.config.update(config);

        dbApi = new AWS.DynamoDB();
        console.log("create dbApi done");

        return dbApi;
    } catch(err) {
        console.error({ err });
    }
}