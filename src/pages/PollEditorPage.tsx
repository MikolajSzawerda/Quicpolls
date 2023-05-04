import {AnswerAdder} from "../../components/AnswerAdder";
import {useState} from "react";
import {AnswerEdit} from "../../components/AnswerEdit";

export default function PollEditorPage() {
    const [answers, setAnswers] = useState<Array<string>>([])
    const onAdd = (value: string) => {
        setAnswers([...answers, value])
    }

    const onEdit = (value: string, idx: number) => {
        const newArr = [...answers]
        newArr[idx] = value
        setAnswers(newArr)
    }

    const onDelete = (idx: number) => {
        const newArr = [...answers]
        newArr.splice(idx, 1)
        setAnswers(newArr)
    }

    return <main className="poll-ans-panel">
        <div className="poll-answers">
            {
                answers.map((name, idx) => {
                    return <AnswerEdit text={name} idx={idx} onEdit={onEdit} onDelete={onDelete}/>
                })
            }
            <AnswerAdder onAdd={onAdd}/>

        </div>
        <div className="answer-action-buttons">
            <button className="answer-button-reset" onClick={() => {
            }}>Reset
            </button>
            <button className="answer-button-submit" onClick={() => {
            }}>Submit
            </button>
        </div>
    </main>
}