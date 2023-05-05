import {SupaResponse} from "../lib/Types";
import {useState} from "react";
import {supaClient} from "../lib/supa-client";

interface PollCardProps{
    onOpen: ()=>void
    data: SupaResponse
}

export const PollCard = ({onOpen, data}:PollCardProps) => {
    const [pollData, setPollData ] = useState(data)
    const answers = Object.values(pollData.answers)
    const color = pollData.isopened ? "green" : "red"
    const state = pollData.isopened ? "Opened" : "Finished"
    console.log("id", pollData.id)
    const onFinishPoll = () => {
        const finishPoll = async () => {
            const {data, error} = await supaClient
                .from("polls")
                .update({isopened: false})
                .match({id: pollData.id})
                .select()
            if(error) console.error(error)
            else setPollData(data[0] as SupaResponse)
        }
        finishPoll().then()
    }

    return <div className="poll-card" >
        <div className="poll-card-heading">Question: {pollData.question}</div>
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
            {pollData.isopened ?
                <div className="poll-card-button" onClick={onFinishPoll}>Finish</div> : <></>
            }
            <div className="poll-card-button">Delete</div>
        </div>
    </div>
}