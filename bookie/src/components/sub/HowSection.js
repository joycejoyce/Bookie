import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UIDesignFlow from '../about/UIDesignFlow.js';
import CodingTechnique from '../about/CodingTechnique.js';
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
                    <UIDesignFlow />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel8bh-content"
                    id="panel8bh-header"
                >
                    <div className="title">Apply & Customize Material UI</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="desc" id="applyMUI">
                        I wrote <a href="https://joycethecoder.com/?p=1402">an article</a> about this topic.
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel9bh-content"
                    id="panel9bh-header"
                >
                    <div className="title">Coding Techniques</div>
                </AccordionSummary>
                <AccordionDetails>
                    <CodingTechnique />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}