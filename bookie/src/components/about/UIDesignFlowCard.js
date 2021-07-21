import { Paper } from '@material-ui/core';

export default function UIDesignFlowCard({num, title, desc, backElem}) {
    return (
        <div className="uiDesignFlowCard">
            <div className="card">
                <Paper className="front">
                    <div className="wrapper">
                        <div className="num">{num}</div>
                        <div className="title">{title}</div>
                        <div className="line"></div>
                        <div className="desc">{desc}</div>
                    </div>
                </Paper>
                <Paper className="back">
                    {backElem}
                </Paper>
            </div>
        </div>
    );
}