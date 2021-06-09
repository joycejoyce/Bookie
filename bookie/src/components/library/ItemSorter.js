export default function getSortedItems(items, sort) {
    const { orderBy, order } = sort;
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
    return sortedItems;
}

function getComparator(order) {
    return order === 'desc'
        ? (a, b) => descComparator(a, b)
        : (a, b) => -descComparator(a, b);
}

function descComparator(a, b) {
    return b[1].localeCompare(a[1]);
}