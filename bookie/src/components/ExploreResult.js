import { Component } from "react";
import '../scss/ExploreResult.scss';
import MyTextField from './sub-components/MyTextField.js';
import MyDropdown from './sub-components/MyDropdown.js';
import SearchIcon from '@material-ui/icons/Search';

const iconStyle = {
    fontSize: "clamp(24px, 4vmin, 32px)",
    fill: "#118ab2"
};

class ExploreResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: {
                id: "keyword",
                label: "Keyword",
                value: ""
            }
        };
    }

    handleOnChange = (e) => {
        const { value, id } = e.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value
            }
        }));
    }

    render() {
        return (
            <div className="exploreResult">
                <div className="contents">
                    <div className="searchSection">
                        <MyTextField id={this.state.keyword.id}
                            label={this.state.keyword.label}
                            value={this.state.keyword.value}
                            size="small"
                            handleOnChange={this.handleOnChange}
                        />
                        <MyDropdown id="dropdown" />
                        <SearchIcon id="searchIcon" style={iconStyle} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExploreResult;