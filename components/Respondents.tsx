import {SupaResponse} from "../lib/Types";
import  PersonSVG from "../src/assets/person.svg";

export const Respondents = ({answers}: SupaResponse) => {
    const total = Object.values(answers ?? {}).reduce((a, c)=>a+c.count, 0)
    return <div className="poll-result-respondents">
        <span>{total}</span>
        <img src={PersonSVG} className="icon"/>
    </div>
}