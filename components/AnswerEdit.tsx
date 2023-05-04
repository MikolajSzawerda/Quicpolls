import {AnswerButton} from "./AnswerButton";
import {useState} from "react";
import DeleteSVG from "../src/assets/delete.svg";
import EditSVG from "../src/assets/edit.svg";

interface AnswerEditProps {
    text: string
    idx: number
    onEdit: (value: string, idx: number) => void
    onDelete: (idx: number) => void
}

export const AnswerEdit = ({text, idx, onEdit, onDelete}: AnswerEditProps) => {
    const [editing, setEditing] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const onSubmit = ({target}: React.FocusEvent<HTMLInputElement>) => {
        if(target.value){
            onEdit(target.value, idx)
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
            <div>
                <input ref={(input) => input && input.focus()} onBlur={onSubmit} type="text"
                       className="answer-adder-input"/>
            </div> :
            <div key={idx} className="answer-edit-button" onMouseLeave={() => setIsHover(false)}>
                    <img src={DeleteSVG} className="icon icon-hover" alt="Delete" onClick={onDeleteClick}/>
                    <img src={EditSVG} className="icon icon-hover" alt="Edit" onClick={onEditClick}/>
            </div>

}