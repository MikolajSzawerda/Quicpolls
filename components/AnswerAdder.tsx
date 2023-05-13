import {useRef, useState} from "react";
import {AnswerInput} from "./AnswerInput";

export interface onAddFunc {
    (value: string): void;
}

export const AnswerAdder = ({onAdd}: { onAdd: onAddFunc }) => {
    const [editorOpen, setEditorOpen] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const onAddClick = () => {
        setEditorOpen(true)
        ref.current?.focus()
    }

    const onSubmit = (input: HTMLInputElement) => {
        if (input.value) {
            onAdd(input.value)
        }
        setEditorOpen(false)
    }
    return !editorOpen ? <div className="answer-button-selected red-button" onClick={onAddClick}>
            +
        </div> :
        <AnswerInput onSubmit={onSubmit}/>
}