import { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import PanelContents from './PanelContent.js';
import getBookInfo, { classifications } from '../../model/BookInfoHandlers/BookInfoGetter.js';
import { modifyBookInfo } from '../../model/BookInfoHandlers/BookInfoModifier.js';
import getSortedItems from './ItemSorter.js';
import { updateItem as updateItemForRating, updateDBData as updateDBDataForRating } from './Rater.js';

const styles = theme => ({
    wrapper: {
        marginBottom: '5vmin'
    }
});

class LibraryPanels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toRead: {
                id: "toRead",
                index: 0,
                items: {},
                sort: {
                    orderBy: 'title',
                    order: 'asc'
                },
                numSelected: 0,
                allChecked: false,
                columns: [
                    {
                        label: "Cover",
                        name: "thumbnail"
                    },
                    {
                        label: "Title",
                        name: "title"
                    },
                    {
                        label: "Author",
                        name: "author"
                    }
                ]
            },
            haveRead: {
                id: "haveRead",
                index: 1,
                items: {},
                sort: {
                    orderBy: 'title',
                    order: 'asc'
                },
                numSelected: 0,
                allChecked: false,
                columns: [
                    {
                        label: "Cover",
                        name: "thumbnail"
                    },
                    {
                        label: "Rate",
                        name: "rate"
                    },
                    {
                        label: "Review",
                        name: "review"
                    },
                    // {
                    //     label: "Title",
                    //     name: "title"
                    // },
                    // {
                    //     label: "Author",
                    //     name: "author"
                    // }
                ]
            },
            ctrl: {
                onCheckItem: this.handleOnCheckItem,
                onCheckSelectAll: this.handleOnCheckSelectAll,
                onClickDelete: this.handleOnClickDelete,
                onClickMoveToHaveRead: this.handleOnClickMoveToHaveRead,
                onClickSort: this.handleOnClickSort,
                onClickRate: this.handleOnChangeRateOrReview,
                onClickSaveReview: this.handleOnChangeRateOrReview
            }
        }
    }

    async componentDidMount() {
        const auth = { username: "test" };
        const result_getItems_toRead = getBookInfo(classifications.toRead, auth);
        const result_getItems_haveRead = getBookInfo(classifications.haveRead, auth);

        try {
            await Promise.all([result_getItems_toRead, result_getItems_haveRead])
                .then(([result_getItems_toRead, result_getItems_haveRead]) => {
                    console.log({ result_getItems_toRead });
                    console.log({ result_getItems_haveRead });

                    if (result_getItems_toRead && result_getItems_toRead.items) {
                        const { items: items_toRead } = result_getItems_toRead;
                        // console.log({ items_toRead });
                        this.setNestedState(classifications.toRead, "items", items_toRead);
                    }
                    
                    if (result_getItems_haveRead && result_getItems_haveRead.items) {
                        const { items: items_haveRead } = result_getItems_haveRead;
                        // console.log({ items_haveRead });
                        this.setNestedState(classifications.haveRead, "items", items_haveRead);
                    }
                });
        } catch(err) {
            console.error(err);
        }
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
        const { toRead, haveRead } = this.state;
        const { value: tabIdx } = this.props.tabs;
        if (tabIdx === toRead.index) {
            return classifications.toRead;
        }
        else {
            return classifications.haveRead;
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
        const classification = this.getClassification();
        const checkedItemIds = this.getCheckedItemIds(classification);
        // console.log({ checkedItemIds });

        const auth = { username: "test" };
        const action = "delete";
        const result = await modifyBookInfo({ auth, checkedItemIds, classification, action });
        // console.log(result);

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

    handleOnClickMoveToHaveRead = async () => {
        const classification = this.state.toRead.id;
        const checkedItemIds = this.getCheckedItemIds(classification);
        console.log({ checkedItemIds });
        const auth = { username: "test" };
        const action = "moveToHaveRead";
        const result = await modifyBookInfo({ auth, checkedItemIds, action });
        // console.log(result);

        // 1. set toRead items
        const { items: items_toRead } = this.state.toRead;
        let itemsToMove = {};
        checkedItemIds.forEach(id => {
            itemsToMove[id] = items_toRead[id];
            itemsToMove[id].checked = false;
            delete items_toRead[id];
        });
        this.setNestedState("toRead", "items", items_toRead);
        this.resetSelectItems(classification);

        // 2. set haveRead items
        const { items: items_haveRead } = this.state.haveRead;
        checkedItemIds.forEach(id => items_haveRead[id] = itemsToMove[id]);
        this.setNestedState("haveRead", "items", items_haveRead);
    }

    handleOnChangeRateOrReview = async (id, name, value) => {
        console.log({ id, name, value });
        const { items } = this.state.haveRead;
        updateItemForRating(items, id, name, value);
        console.log({ items });
        this.setNestedState("haveRead", "items", items);

        updateDBDataForRating(this.props.auth, items[id], id, name, value);
    }

    render() {
        const { auth, theme, tabs, classes } = this.props;
        const { value: tabIdx } = tabs;
        const { toRead, haveRead, ctrl } = this.state;
        
        return (
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tabIdx}
                onChangeIndex={this.handleOnChangeIndex}
                className={classes.wrapper}
            >
                <PanelContents
                    dir={theme.direction}
                    auth={auth}
                    tabIndex={tabIdx}
                    data={toRead}
                    ctrl={ctrl}
                />
                <PanelContents
                    dir={theme.direction}
                    auth={auth}
                    tabIndex={tabIdx}
                    data={haveRead}
                    ctrl={ctrl}
                />
            </SwipeableViews>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LibraryPanels);