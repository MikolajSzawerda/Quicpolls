import {SupaResponse} from "../lib/Types";

// const data = {
//     question: "Neque porro quisquam est qui dolorem consectetur?",
//     shortId: "abc123",
//     answers: {
//         "1": {
//             id: 0,
//             text: "Lorem ipsum dolor sit amet, consectetur1",
//             count: 2
//         },
//         "2": {
//             id: 1,
//             text: "Lorem ipsum dolor sit amet, consectetur2",
//             count: 3
//         },
//         "3": {
//             id: 2,
//             text: "Lorem ipsum dolor sit amet, consectetur3",
//             count: 2
//         },
//         "4": {
//             id: 3,
//             text: "Lorem ipsum dolor sit amet, consectetur4",
//             count: 10
//         },
//     }
// }as SupaResponse

interface PollCardProps{
    onOpen: ()=>void
    data: SupaResponse
}

export const PollCard = ({onOpen, data}:PollCardProps) => {
    const answers = Object.values(data.answers)
    const color = data.isopened ? "green" : "red"
    const state = data.isopened ? "Opened" : "Finished"
    return <div className="poll-card" >
        <div className="poll-card-heading">Question: {data.question}</div>
        <div className="poll-card-state"><b>State: </b> <span style={{color: color}}>{state}</span></div>
        <div className="poll-card-answers">
            {
                answers.map((answer)=>{
                    return <div className="poll-card-answer">
                        <div>
                            {answer.text}
                        </div>
                        <div className="poll-card-answer-count">
                            <b>Answers:</b> {answer.count}
                        </div>
                    </div>
                })
            }
        </div>
        <div className="poll-card-buttons poll-card-answers">
            <div className="poll-card-button" onClick={onOpen}>Open</div>
            <div className="poll-card-button">To pdf</div>
            {data.isopened ?
                <div className="poll-card-button">Finish</div> : <></>
            }
            <div className="poll-card-button">Delete</div>
        </div>
    </div>
}