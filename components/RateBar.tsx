export const RateBar = ({text, count, ...props}:Answer) => {
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