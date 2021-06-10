export default function getSortedItems(items, sort) {
    const { orderBy, order } = sort;
    console.log({ orderBy, order });
    const dataList = Object.keys(items).map(key => [items[key], items[key][orderBy], key]);
    const comparator = getComparator(order);
    const sortedDataList = dataList.sort(comparator);
    const sortedItems = sortedDataList.reduce((accu, data) => {
        const [item, orderByValue, key] = data;
        accu = {
            ...accu,
            [key]: item
        };
        return accu;
    }, {});
    console.log({items, sortedItems});
    return sortedItems;
}

function getComparator(order) {
    return order === 'desc'
        ? (a, b) => descComparator(a, b)
        : (a, b) => -descComparator(a, b);
}

function descComparator(a, b) {
    console.log({a, b});
    if (typeof a === "string") {
        return b[1].localeCompare(a[1]);
    }
    else {
        if (b[1] > a[1]) {
            return 1;
        }
        else if (b[1] === a[1]) {
            return 0;
        }
        else {
            return -1;
        }
    }
    
}