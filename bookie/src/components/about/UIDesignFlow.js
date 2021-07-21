import UIDesignFlowCard from "./UIDesignFlowCard";
import UserStory from "./UserStory.js";
import LinkBtn from "./LinkBtn.js";

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
            <UIDesignFlowCard 
                num="3"
                title="Flow Chart"
                desc="The flow of major functions"
                backElem={
                    <LinkBtn
                        text="Flow Chart"
                        link="https://docs.google.com/presentation/d/1_xY2oPmcajoFJkBx6FuaFJBbeHqTdn9KH93AXWWGk8Y/edit?usp=sharing"
                    />
                }
            />
            <UIDesignFlowCard 
                num="4"
                title="UI Flow"
                desc="Use a diagram to explain which pages would be visited to achieve a certain task"
                backElem={
                    <LinkBtn
                        text="UI Flow (sign-in)"
                        link="https://drive.google.com/file/d/1QkRrWsty9u7rf5R5DLuOm1oJpuwMbGjw/view?usp=sharing"
                    />
                }
            />
            <UIDesignFlowCard 
                num="5"
                title="Wireframe"
                desc="The blueprint of each page"
                backElem={
                    <LinkBtn
                        text="Wireframe"
                        link="https://www.figma.com/file/hlVjhmInLCDssjlMYgYpCN/Bookie-Wireframe"
                    />
                }
            />
            <UIDesignFlowCard 
                num="6"
                title="Mockup"
                desc="The final look of each page"
                backElem={
                    <LinkBtn
                        text="Mockup"
                        link="https://www.figma.com/file/6vSZYTaM3GbYupyjTl5E6n/Bookie-Mockup"
                    />
                }
            />
        </div>
    )
}