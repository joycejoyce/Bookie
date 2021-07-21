import UIDesignFlowCard from "./UIDesignFlowCard";

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
        </div>
    )
}