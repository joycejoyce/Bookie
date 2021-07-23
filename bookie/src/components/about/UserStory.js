const Pair = ({title, desc}) => (
    <div className="pair">
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
    </div>
);

export default function UserStory() {
    return (
        <div className="userStory">
            <Pair title="As a" desc="book reader"/>
            <Pair title="I want to" desc="make a to-read list"/>
            <Pair title="To" desc="enrich my reading experience"/>
        </div>
    );
}