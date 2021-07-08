import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ProsConsTable from './ProsConsTable.js';

// function MyAccordion({title, desc}) {
//     return (

//     )
// }

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="howSection">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <div className="title">Third-Party API</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc">
                        Use <a href="https://developers.google.com/books">Google Books API</a> to get book information.
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <div className="title">Serverless Application</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc">
                        Use <a href="https://aws.amazon.com/dynamodb/?nc1=h_ls">AWS DynamoDB</a> to store data and&nbsp;
                        <a href="https://aws.amazon.com/dynamodb/?nc1=h_ls">AWS Cognito</a> to create user account and handle sign in &#38; sign out.
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <div className="title">Follow UI Design Flow</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc">
                        <div className="story">
                            Follow the UI design flow makes the development for Bookie much smoother.<br /><br />
                            For example, without following the flow, on top of my head, only the "sign in" button is included in the sign-in page.<br /><br />
                            But after this series of design SOP, I found out the whole process of "user account management" should be considered all together, including "account rescue" and "reset password"
                        </div>
                        <br />
                        <div className="bold">The UI design flow is:</div>
                        <div className="itemTitle">1. User story</div>
                        <div className="itemDesc">
                            <div className="brief italic">Express the product function with different roles.</div>
                            E.g., As a <span className="bold">book reader</span> (<span className="italic">role</span>),
                            I want to <span className="bold">make a to-read list</span> (<span className="italic">goal</span>)
                            to <span className="bold">enrich my reading experience</span> (<span className="italic">the value that the goal would create</span>).
                        </div>
                        <div className="itemTitle">2. Functional Map</div>
                        <div className="itemDesc">
                            <div className="brief italic">Turn the user story into an easy-to-understand mind map.</div>
                            <a href="https://drive.google.com/file/d/147xwMJWvZ3xwmdpNiVvM9lYsPgrLhMni/view?usp=sharing" target="blank">Bookie's functional map</a>
                        </div>
                        <div className="itemTitle">3. Flow Chart</div>
                        <div className="itemDesc">
                            <div className="brief italic">The flow chart is being used to confirm all status and major functions, and is essential for sketching wireframe diagrams later.</div>
                        </div>
                        <div className="itemTitle">4. UI Flow</div>
                        <div className="itemDesc">
                            <div className="brief italic">Use a diagram to explain which pages would be visited to achieve a certain task.</div>
                            <a href="https://drive.google.com/file/d/1QkRrWsty9u7rf5R5DLuOm1oJpuwMbGjw/view?usp=sharing" target="blank">Bookie's sign-in UI flow</a>
                        </div>
                        <div className="itemTitle">5. Wireframe</div>
                        <div className="itemDesc">
                            <div className="brief italic">The blueprint of each page.</div>
                            <a href="https://www.figma.com/file/hlVjhmInLCDssjlMYgYpCN/Bookie-Wireframe" target="blank">Bookie's wireframe</a>
                        </div>
                        <div className="itemTitle">6. Mockup</div>
                        <div className="itemDesc">
                            <div className="brief italic">The final look of each page.</div>
                            <a href="https://www.figma.com/file/6vSZYTaM3GbYupyjTl5E6n/Bookie-Mockup" target="blank">Bookie's mockup</a>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <div className="title">React Programming Techniques</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc pairContainer">
                        <div className="pair">
                            <div><span className="bold problem">★ Encountered problem</span><br />When there are lots of checkboxes to render, everytime I click on one of the checkboxes, the other would all been re-rendered and causing bad render performance.</div>
                            <div>
                                <span className="bold solution">★ Solution</span><br />Use React.memo to wrapped around the checkbox component. That way, only the props passed into the component changed that it would be re-rendered.
                                (<a href="https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20" target="blank">reference</a>)
                            </div>
                        </div>
                        {/* <div><span className="bold problem">★ Encountered problem #2:</span> The state handlers should be located at the parent or the child component?</div>
                        <ProsConsTable /> */}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion id="specialEffect" expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                >
                    <div className="title">Special Effect</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc">
                        <div className="itemTitle">Effect #1 Loading</div>
                        <iframe width="600px" height="220px" src="//jsfiddle.net/dorith1989/p04dr1gs/22/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
                        <div className="itemTitle">Effect #2 Style scrollbar</div>
                        <iframe width="600px" height="220px" src="//jsfiddle.net/dorith1989/c7ods3t4/26/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}