import {Answer} from "../lib/Types";
import "./RateBar.css";

export const RateBar = ({text, count}: Answer) => {
    return <div className="rate-bar">
        <div className="bar-info">
                <span>
                    {text}
                </span>
            <b>{count.toFixed(2)}%</b>
        </div>
        <div className="bar-base">
            <div className="bar-given" style={{width: `${count}%`}}></div>
            <div className="bar-empty"></div>
        </div>
    </div>
}