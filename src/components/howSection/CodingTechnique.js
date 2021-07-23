import "../../scss/CodingTechnique.scss";
import LinkBtn from "./LinkBtn.js";

export default function CodingTechnique() {
    return (
        <div className="codingTechnique">
            <LinkBtn 
                text="Responsive Navbar"
                link="http://jsfiddle.net/dorith1989/8vtn2p9o/20/"
            />
            <LinkBtn 
                text="Responsive Font Size"
                link="http://jsfiddle.net/dorith1989/x31snv8f/7/"
            />
            <LinkBtn 
                text="Compare Strings"
                link="http://jsfiddle.net/dorith1989/fu5qy3sx/8/"
            />
            <LinkBtn 
                text="Send HTTP Requests"
                link="http://jsfiddle.net/dorith1989/1zv23yh7/19/"
            />
            <LinkBtn 
                text="CSS Loader"
                link="http://jsfiddle.net/dorith1989/p04dr1gs/22/"
            />
            <LinkBtn 
                text="Style Scrollbar"
                link="http://jsfiddle.net/dorith1989/c7ods3t4/29/"
            />
            <LinkBtn 
                text="Improve Checkbox Render Performance"
                link="https://medium.com/@freshmilkdev/reactjs-render-optimization-for-collapsible-material-ui-long-list-with-checkboxes-231b36892e20"
            />
            <LinkBtn 
                text="Slide Effect"
                link="https://jsfiddle.net/dorith1989/cv0Lfo47/80/"
            />
        </div>
    );
}