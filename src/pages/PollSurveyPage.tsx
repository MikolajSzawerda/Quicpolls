import {AnswerButton} from "../../components/AnswerButton";
import {useEffect, useState} from "react";
import {supaClient} from "../../lib/supa-client";
import {useParams} from "react-router-dom";
import {SupaResponse} from "../../lib/Types";

export default function PollSurveyPage() {
    const {pollId} = useParams();
    const [chosen, setChosen] = useState<number | undefined>(undefined)
    const [pollData, setPollData] = useState<SupaResponse>()

    const checkIfAnswerd = (pollId: string) => {
        const answers = localStorage.getItem('answered')
        if (answers) {
            const parsed = JSON.parse(answers) as Array<string>
            console.log(parsed)
            return parsed.includes(pollId as string)
        }
        return false
    }

    const [answerd, setAnswerd] = useState(checkIfAnswerd(pollId as string))

    useEffect(() => {
        if (!answerd) {
            const fetchData = async () => {
                console.log("API CALL")
                const {data, error} = await supaClient
                    .from("polls")
                    .select()
                    .eq('shortId', pollId)
                    .limit(1)
                if (error) {
                    console.error(error)
                }
                if (data) {
                    console.log("DATA:", data)
                    setPollData(data[0] as SupaResponse)
                }
            }
            fetchData().catch(console.error)
        }
    }, [answerd])

    const onChose = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setChosen(Number(event.currentTarget.id))
    };

    const onReset = () => {
        setChosen(undefined)
    }

    const onSubmit = () => {
        if (typeof window !== 'undefined') {
            if (chosen) {
                console.log(`You submitted ${chosen}`)
                const answers = localStorage.getItem('answered')
                let parsed = [pollId as string]
                if (answers) {
                    parsed = JSON.parse(answers) as Array<string>
                    parsed.push(pollId as string)
                }
                localStorage.setItem('answered', JSON.stringify(Array.from(new Set(parsed))))
                setAnswerd(true)
            }
        }
    }


    return <>
        <main className="poll-ans-panel">
            {!answerd ? <>

                    <h1>{pollData?.question}</h1>
                    <div>Select one option</div>
                    <div className="poll-answers">
                        {
                            pollData?.answers.map((ans) => {
                                return <div key={ans.id} onClick={onChose} id={ans.id.toString()}>
                                    <AnswerButton text={ans.text} disable={chosen != undefined ? chosen != ans.id : true}
                                                  key={ans.id}/>
                                </div>
                            })
                        }
                    </div>
                    <div className="answer-action-buttons">
                        <button className="answer-button-reset" onClick={onReset}>Reset</button>
                        <button className="answer-button-submit" onClick={onSubmit}>Submit</button>
                    </div>
                </>
                :
                <>
                    <h1>You have answered on that question :)</h1>
                </>}
        </main>
    </>
}