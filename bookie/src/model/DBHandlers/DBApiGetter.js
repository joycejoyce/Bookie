import { DBConfig } from "../../config.json";
import AWS from "aws-sdk";

let dbApi = null;
export default function getDBApi() {
    if (dbApi) {
        console.log("dbApi already exists");
        return dbApi;
    }

    console.log("going to create dbApi");
    try {
        const { region, IdentityPoolId } = DBConfig;
        const config = {
            region,
            credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId})
        };
        console.log({config});

        AWS.config.update(config);

        dbApi = new AWS.DynamoDB();
        return dbApi;
    } catch(e) {
        console.error("Caught error in connectDB()", e);
    }
}