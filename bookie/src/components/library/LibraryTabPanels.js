import { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import PanelContents from './PanelContent.js';
import getBookInfo from '../../model/BookInfoHandlers/BookInfoGetter.js';
import { modifyBookInfo } from '../../model/BookInfoHandlers/BookInfoModifier.js';

const styles = theme => ({

});

function getSortedItems(items, sort) {
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

class LibraryPanels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ToRead: {
                id: "ToRead",
                index: 0,
                items: {},
                sort: {
                    orderBy: 'title',
                    order: 'asc',
                    onClickSort: this.handleOnClickSort
                },
                numSelected: 0,
                allChecked: false
            },
            HaveRead: {
                id: "HaveRead",
                index: 1,
                items: {},
                sort: {
                    orderBy: 'title',
                    order: 'asc',
                    onClickSort: this.handleOnClickSort
                },
                numSelected: 0,
                allChecked: false
            },
            ctrl: {
                onCheckItem: this.handleOnCheckItem,
                onCheckSelectAll: this.handleOnCheckSelectAll,
                onClickDelete: this.handleOnClickDelete
            }
        }
    }

    async componentDidMount() {
        // const { auth } = this.props;
        const auth = { username: "test" };
        const { ToRead, HaveRead } = this.state;
        const result_getItems_toRead = getBookInfo(ToRead.id, auth);
        const result_getItems_haveRead = getBookInfo(HaveRead.id, auth);

        await Promise.all([result_getItems_toRead, result_getItems_haveRead])
            .then(([result_getItems_toRead, result_getItems_haveRead]) => {
                const { items: items_toRead } = result_getItems_toRead;
                console.log({ items_toRead });
                this.setNestedState(ToRead.id, "items", items_toRead, () => console.log("toRead", this.state.ToRead.items));

                const { items: items_haveRead } = result_getItems_haveRead;
                console.log({ items_haveRead });
                this.setNestedState(HaveRead.id, "items", items_haveRead);
            });
    }

    setNestedState = (parentName, childName, value, callback) => {
        this.setState(prevState => ({
            ...prevState,
            [parentName]: {
                ...prevState[parentName],
                [childName]: value
            }
        }), callback ? callback : () => {});
    }

    handleOnChangeIndex = (value) => {
        this.props.setParentState("tabs", "value", value);
    }

    handleOnClickSort = (e, newOrderBy) => {
        const classification = this.getClassification();
        const data = this.state[classification];
        const { sort, items } = data;
        const { orderBy, order } = sort;
        const isAsc = (orderBy === newOrderBy && order === 'asc');
        const newOrder = isAsc ? 'desc' : 'asc';
        const newSort = {
            ...sort,
            orderBy: newOrderBy,
            order: newOrder
        };
        this.setNestedState(classification, "sort", newSort);

        const sortedItems = getSortedItems(items, newSort);
        this.setNestedState(classification, "items", sortedItems);
    }

    getClassification = () => {
        const { ToRead, HaveRead } = this.state;
        const { value: tabIdx } = this.props.tabs;
        if (tabIdx === ToRead.index) {
            return ToRead.id;
        }
        else {
            return HaveRead.id;
        }
    }

    handleOnCheckItem = (e) => {
        const { id, checked } = e.target;
        const classification = this.getClassification();
        const { items } = this.state[classification];
        items[id].checked = checked;
        this.setNestedState(classification, "items", items);
        this.setNestedState(classification, "numSelected", this.getNumSelected(classification));
    }

    getNumSelected = (classification) => {
        const { items } = this.state[classification];
        const numSelected = Object.keys(items).reduce((accu, key) => {
            const { checked } = items[key];
            if (checked) {
                accu = accu + 1;
            }
            return accu;
        }, 0);
        return numSelected;
    }

    handleOnCheckSelectAll = (e) => {
        const { checked } = e.target;
        const classification = this.getClassification();
        this.setNestedState(classification, "allChecked", checked);

        const { items } = this.state[classification];
        (Object.keys(items)).forEach(key => {
            const item = items[key];
            item.checked = checked;
        });
        this.setNestedState(classification, "items", items);
        this.setNestedState(classification, "numSelected", this.getNumSelected(classification));
    }

    handleOnClickDelete = async () => {
        console.log("handleOnClickDelete");

        const classification = this.getClassification();
        const checkedItemIds = this.getCheckedItemIds(classification);
        console.log({ checkedItemIds });

        const auth = { username: "test" };
        const action = "delete";
        const result = await modifyBookInfo({ auth, checkedItemIds, classification, action });
        console.log(result);

        const { items } = this.state[classification];
        checkedItemIds.forEach(id => delete items[id]);
        this.setNestedState(classification, "items", items);
        this.resetSelectItems(classification);
    }

    getCheckedItemIds = (classification) => {
        const { items } = this.state[classification];
        const ids = Object.keys(items).reduce((accu, key) => {
            const value = items[key];
            const { checked, id } = value;
            if (checked) {
                accu.push(id);
            }
            return accu;
        }, []);
        return ids;
    }

    resetSelectItems = (classification) => {
        this.setNestedState(classification, "numSelected", 0);
        this.setNestedState(classification, "allChecked", false);
    }

    render() {
        const { auth, theme, tabs } = this.props;
        const { value: tabIdx } = tabs;
        const { ToRead, HaveRead, ctrl } = this.state;
        
        return (
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabIdx}
                onChangeIndex={this.handleOnChangeIndex}
            >
                <PanelContents
                    dir={theme.direction}
                    auth={auth}
                    tabIndex={tabIdx}
                    data={ToRead}
                    ctrl={ctrl}
                />
                <PanelContents
                    dir={theme.direction}
                    auth={auth}
                    tabIndex={tabIdx}
                    data={HaveRead}
                    ctrl={ctrl}
                />
            </SwipeableViews>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LibraryPanels);