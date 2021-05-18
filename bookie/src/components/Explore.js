import { Component } from "react";
import '../scss/Explore.scss';
import InputText from "./InputText.js";
import { getClassName_init } from "./InputClassNameGetter.js";

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: {
                name: "keyword",
                label: "Keyword",
                value: "",
                type: "text",
                isValid: true,
                errMsg: "",
                className: getClassName_init()
            },
            isFormValid: true,
            errMsg: ""
        };
    }

    handleOnChange = (e) => {
        const {value, id} = e.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value
            }
        }));
    }

    render() {
        return(
            <div className="explore">
                <div className="contents">
                    <h1>Explore books</h1>
                    <InputText data={this.state.keyword} handleOnChange={this.handleOnChange} />
                </div>
            </div>
        );
    }
}

export default Explore;