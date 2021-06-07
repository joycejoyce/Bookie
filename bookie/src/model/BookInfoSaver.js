
import createTable, { getParams as getParams_createTable } from './DBHandlers/TableCreator.js';
import updateItem, { getParams as getParams_updateItem } from './DBHandlers/ItemUpdater.js';
import getItem, { getParams as getParams_getItem } from './DBHandlers/ItemGetter.js';

export default async function save(auth, bookInfo) {
    console.log("save");

    const params_createTblUser = getParams_createTable("User");
    const result_createTblUser = await createTable(params_createTblUser);
    if (!result_createTblUser.isNormalEnd) {
        return result_createTblUser;
    }
    
    const params_createTblBook = getParams_createTable("Book");
    const result_createTblBook = await createTable(params_createTblBook);
    if (!result_createTblBook.isNormalEnd) {
        return result_createTblBook;
    }

    const params_updUser_list = getParams_updateItem(auth, bookInfo, "User");
    console.log({ params_updUser_list });
    params_updUser_list.forEach(async params_updUser => {
        const result_updTblUser = await updateItem(params_updUser);
        console.log({ result_updTblUser });
        if (!result_updTblUser.isNormalEnd) {
            return result_updTblUser;
        }

        // for test only [start]
        const params_getUser = getParams_getItem({ data: auth }, "User");
        const result_getUserItem = await getItem(params_getUser);
        console.log({ result_getUserItem });
        // for test only [end]
    });

    const result = {
        isNormalEnd: true,
        msg: ""
    };

    return result;
}