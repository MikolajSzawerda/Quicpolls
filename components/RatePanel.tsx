import {RateBar} from "./RateBar";
import {SupaResponse} from "../lib/Types";

export const RatePanel = ({answers}: SupaResponse) => {
    const answers_list = Object.values(answers)
    const total = answers_list.reduce((a, c) => a + c.count, 0)
    return <div className="rate-panel">
        {answers_list.map((info) => {
            return <RateBar {...info} count={total != 0 ? 100*info.count/total : 0} key={info.id}/>
        })}
    </div>
}