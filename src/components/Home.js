import { Component } from "react";
import '../scss/Home.scss';
import HowSection from './howSection/HowSection.js';
import WhatSection from './whatSection/WhatSection.js';

function TitleSection({t1, t2}) {
    return (
       <div className="titleSection">
            <div className="t1">{t1}</div>
            <div className="t2">{t2}</div>
        </div>
    );
}

class Home extends Component {
    render() {
        return(
            <div className="home">
                <div className="contents">
                    <div className="section">
                        <TitleSection t1="What" t2="Bookie Do" />
                        <WhatSection />
                    </div>
                    <div className="section">
                        <TitleSection t1="How" t2="Bookie Do It" />
                        <HowSection />
                    </div>
                    {/* <div className="section">
                        <TitleSection t1="About" t2="the Creator" />
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Home;