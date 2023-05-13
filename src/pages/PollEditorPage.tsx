import {AnswerAdder} from "../../components/AnswerAdder";
import {useContext, useRef, useState} from "react";
import {AnswerEdit} from "../../components/AnswerEdit";
import {Answer, SupaResponse} from "../../lib/Types";
import {supaClient} from "../../lib/supa-client";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../main";
import "./PollResultPage.css";

export default function PollEditorPage() {
    const [answers, setAnswers] = useState<Array<string>>([])
    const [wrongSubmission, setWrongSubmission] = useState(false)
    const questionRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const session = useContext(UserContext)
    let author: string
    if (!session.currentSession?.user) {
        navigate("/auth")
    } else {
        author = session.currentSession.user.id
    }
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

    const onReset = () => {
        if (questionRef?.current) {
            questionRef.current.value = ""
        }
        setAnswers([])
    }

    const onSubmit = () => {
        const question = questionRef?.current?.value
        const ans = answers.map((text, idx) => {
            return {id: idx, text: text, count: 0} as Answer
        }).reduce((acc, curr) => {
            return {...acc, [curr.id.toString()]: curr}
        }, {})
        if (question && answers.length) {
            const req: SupaResponse = {
                question: question,
                shortId: "",
                author: author,
                answers: ans
            }
            const insertData = async (submision: SupaResponse) => {
                const {data, error} = await supaClient
                    .from("polls")
                    .insert(submision)
                    .select()
                if (error) console.log(error)
                else {
                    const id = (data[0] as SupaResponse).shortId
                    if (id) {
                        navigate(`/polls/${id}`)
                    }
                }
            }
            insertData(req).then()
        } else {
            setWrongSubmission(true)
        }
    }

    const waringField = () => {
        const questionValue = questionRef.current?.value.trim()
        const answersCount = answers.length
        console.log(questionValue == "" && answersCount == 0)
        if (questionValue == "" && answersCount == 0) {
            console.log("HELLO")
            return <div className="poll-answers-warning">Question and answers cannot be empty!</div>
        }
        if (questionValue == "") {
            return <div className="poll-answers-warning">Question cannot be empty!</div>
        }
        if (answersCount == 0) {
            return <div className="poll-answers-warning">Answers cannot be empty!</div>
        }
        return <></>
    }

    return <div className="poll-ans-panel">
        <h1>Enter poll data</h1>
        {wrongSubmission && waringField()}
        <h2>Question:</h2>
        <input ref={questionRef} type="text" className="answer-adder-input focused-input"/>
        <h2>Answers</h2>
        <div className="poll-answers">
            {
                answers.map((name, idx) => {
                    return <AnswerEdit text={name} idx={idx} onEdit={onEdit} onDelete={onDelete} key={idx}/>
                })
            }

            <AnswerAdder onAdd={onAdd}/>
        </div>
        <div className="answer-action-buttons">
            <button className="answer-button-reset" onClick={onReset}>Reset
            </button>
            <button className="answer-button-submit" onClick={onSubmit}>Submit
            </button>
        </div>
    </div>
}