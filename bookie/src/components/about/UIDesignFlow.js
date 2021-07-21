import UIDesignFlowCard from "./UIDesignFlowCard";
import LinkBtn from "./LinkBtn.js";

function UserStory() {
    const Pair = ({title, desc}) => (
        <div className="pair">
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
        </div>
    );

    return (
        <div className="userStory">
            <Pair title="As a" desc="book reader"/>
            <Pair title="I want to" desc="make a to-read list"/>
            <Pair title="To" desc="enrich my reading experience"/>
        </div>
    );
}

export default function UIDeisngFlow() {
    return (
        <div className="uiDesignFlow">
            <UIDesignFlowCard 
                num="1"
                title="User Story"
                desc="Express the product function from the perspective of a certain role"
                backElem={<UserStory />}
            />
            <UIDesignFlowCard 
                num="2"
                title="Functional Map"
                desc="Turn the user story into an easy-to-understand mind map"
                backElem={
                    <LinkBtn
                        text="Functional Map"
                        link="https://drive.google.com/file/d/147xwMJWvZ3xwmdpNiVvM9lYsPgrLhMni/view?usp=sharing"
                    />
                }
            />
        </div>
    )
}