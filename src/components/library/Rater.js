import { modifyBookInfo } from '../../model/BookInfoHandlers/BookInfoModifier.js';

export const names = ['rate', 'review'];

export const types = {
    rate: 'N',
    review: 'S'
}

export const defaultValue = {
    rate: 0,
    review: ''
};

export function updateItem(items, id, name, value) {
    const item = items[id];
    const name_theOther = getName_theOther(name);
    const value_theOther = item[name_theOther];
    item[name] = value;
    item[name_theOther] = value_theOther ? value_theOther : defaultValue[name_theOther];
}

function getName_theOther(name) {
    if (name === names[0]) {
        return names[1];
    }
    else {
        return names[0];
    }
}

export async function updateDBData(auth, item, id, name, value) {
    const name_theOther = getName_theOther(name);
    console.log({ name_theOther });
    const value_theOther = item[name_theOther];
    const action = name;
    const bookInfo = {
        id, [name]: value, [name_theOther]: value_theOther
    };
    const result = await modifyBookInfo({auth, bookInfo, action});
    console.log({ result });
}