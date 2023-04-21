import {RateBar} from "./RateBar";

export const RatePanel = ({answers}: SupaResponse) => {
    const total = answers.reduce((a, c)=>a+c.count, 0)
    return <div className="rate-panel">
        {answers.map((info) => {
            return <RateBar {...info} count={total != 0 ? 100*info.count/total : 0} key={info.id}/>
        })}
    </div>
}