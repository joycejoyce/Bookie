import getItem, { scan, getParams as getParams_getItem } from './ItemGetter.js';

export async function viewResult_User(auth) {
    const params = getParams_getItem(auth, "User");
    const userData = await getItem(params);
    console.log({ auth, userData });
}

export async function viewResult_Book() {
    const params = getParams_getItem({}, "Book");
    const bookData = await scan(params);
    console.log({ bookData });
}