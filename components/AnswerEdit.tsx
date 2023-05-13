import {AnswerButton} from "./AnswerButton";
import {useState} from "react";
import DeleteSVG from "../src/assets/delete.svg";
import EditSVG from "../src/assets/edit.svg";
import {AnswerInput} from "./AnswerInput";

interface AnswerEditProps {
    text: string
    idx: number
    onEdit: (value: string, idx: number) => void
    onDelete: (idx: number) => void
}

export const AnswerEdit = ({text, idx, onEdit, onDelete}: AnswerEditProps) => {
    const [editing, setEditing] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const onSubmit = (input: HTMLInputElement) => {
        if (input.value) {
            onEdit(input.value, idx)
        }
        setEditing(false)
        setIsHover(false)
    }

    const onEditClick = () => {
        setIsHover(false)
        setEditing(true)
    }

    const onDeleteClick = () => {
        onDelete(idx)
        setIsHover(false)
    }
    return !isHover ? <div key={idx} onMouseEnter={() => setIsHover(true)}>
            <AnswerButton text={text} disable={true}/>
        </div> :
        editing ?
            <AnswerInput text={text} onSubmit={onSubmit}/>
            :
            <div key={idx} className="answer-edit-button" onMouseLeave={() => setIsHover(false)}>
                <img src={DeleteSVG} className="icon icon-hover" alt="Delete" onClick={onDeleteClick}/>
                <img src={EditSVG} className="icon icon-hover" alt="Edit" onClick={onEditClick}/>
            </div>

}