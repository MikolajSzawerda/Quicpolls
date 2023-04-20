import {RateBar} from "./RateBar";

interface RateInfos {
    data: BarInfo[]
}

export const RatePanel = ({data}: RateInfos) => {
    const total = data.reduce((a, c)=>a+c.count, 0)
    return <div className="rate-panel">
        {data.map((info) => {
            return <RateBar {...info} count={100*info.count/total} key={info.id}/>
        })}
    </div>
}