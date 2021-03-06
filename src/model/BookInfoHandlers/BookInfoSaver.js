
import createTable, { getParams as getParams_createTable } from '../DBHandlers/TableCreator.js';
import updateItem, { getParams as getParams_updateItem } from '../DBHandlers/ItemUpdater.js';
import { viewResult_User, viewResult_Book } from '../DBHandlers/ItemViewer.js';

export default async function save(auth, bookInfo) {
    console.log("save");

    const params_createTblUser = getParams_createTable("User");
    const result_createTblUser = await createTable(params_createTblUser);
    if (!result_createTblUser.isNormalEnd) {
        return result_createTblUser;
    }
    
    const paramsList_updUser = getParams_updateItem(auth, bookInfo, "User");
    // console.log({ params_updUser_list: paramsList_updUser });
    for (let i in paramsList_updUser) {
        const params_updUser = paramsList_updUser[i];
        // console.log({ params_updUser });
        const result_updUser = await updateItem(params_updUser);
        // console.log({ result_updUser });
        if (!result_updUser.isNormalEnd) {
            return result_updUser;
        }

        await viewResult_User(auth);
    }

    const params_createTblBook = getParams_createTable("Book");
    const result_createTblBook = await createTable(params_createTblBook);
    if (!result_createTblBook.isNormalEnd) {
        return result_createTblBook;
    }

    const params_updBook = getParams_updateItem(auth, bookInfo, "Book");
    const result_updBook = await updateItem(params_updBook);
    // console.log({ result_updBook });
    if (!result_updBook.isNormalEnd) {
        return result_updBook;
    }
    await viewResult_Book();

    const result = {
        isNormalEnd: true,
        msg: ""
    };

    return result;
}