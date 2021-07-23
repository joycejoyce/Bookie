export const categories = ["author", "publisher", "subject"];

const categoryFieldNameMapping = {
    author: "authors",
    publisher: "publisher",
    subject: "categories"
};

const categoryLabelMapping = {
    author: "Author",
    publisher: "Publisher",
    subject: "Subject"
};

export function getDisplayedItems_add(curItems, allItems, category, value) {
    // 1. Get itemIds_toAdd
    const itemIds_add = getIdsByCategoryAndNames(allItems, category, value);
    const itemIds_cur = getIds(curItems);
    const itemIds_toAdd = itemIds_add.filter(id => !itemIds_cur.includes(id));

    // 2. Add items to curItems
    const resultItems = allItems.reduce((accumulator, item) => {
        const { id } = item;
        if (itemIds_toAdd.includes(id)) {
            accumulator.push(item);
        }
        return accumulator;
    }, curItems);

    return resultItems;
}

export function getDisplayedItems_remove(curItems, category, value) {
    // 1. Get items' id by [category, names]
    const itemIds_toRemove = getIdsByCategoryAndNames(curItems, category, value);
    
    // 2. Remove items from curItems
    const resultItems = curItems.filter(item => {
        const { id } = item;
        return !itemIds_toRemove.includes(id);
    })

    return resultItems;
}

function getIdsByCategoryAndNames(allItems, category, value) {
    const fieldName = categoryFieldNameMapping[category];
    const ids = allItems.reduce((accumulator, item) => {
        let values = item.volumeInfo[fieldName];
        if (!Array.isArray(values)) {
            values = [values];
        }
        if (values.includes(value)) {
            const { id } = item;
            accumulator.push(id);
        }
        return accumulator;        
    }, []);

    return ids;
}

function getIds(items) {
    const ids = items.reduce((accumulator, item) => {
        const { id } = item.volumeInfo;
        accumulator.push(id);
        return accumulator;
    }, []);

    return ids;
}

export function getFilterBySearchResult(searchResult) {
    const { items: allItems } = searchResult.response;
    const filter = categories.reduce((accumulator, category) => {
        // label: "Author"
        const label = categoryLabelMapping[category];

        // isOpen: false
        const isOpen = false;

        // values: []
        const values = getSearchResultFieldValues(category, allItems);

        // checkedValues: []
        const checkedValues = values;

        accumulator[category] = {
            label,
            isOpen,
            values,
            checkedValues
        };

        return accumulator;
    }, {});

    filter.displayedItems = allItems;

    return filter;
}

function getSearchResultFieldValues(category, items) {
    let values = items.reduce((accumulator, item) => {
        const { volumeInfo } = item;
        const fieldName = categoryFieldNameMapping[category];
        let categoryValues = volumeInfo[fieldName];
        if (!Array.isArray(categoryValues)) {
            categoryValues = [categoryValues];
        }
        categoryValues = categoryValues.filter(x => {
            if (x) {
                return true;
            }
            else {
                return false;
            }
        });
        accumulator.push(...categoryValues);
        return accumulator;
    }, []);
    values = values.sort();
    
    const distinctValues = [...new Set(values)];

    return distinctValues;
}