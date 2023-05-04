import {useRef, useState} from "react";

export interface onAddFunc {
    (value: string): void;
}

export const AnswerAdder = ({onAdd}: {onAdd: onAddFunc}) => {
    const [editorOpen, setEditorOpen] = useState(false)
    const ref = useRef<HTMLInputElement>(null)
    const onAddClick = () => {
        setEditorOpen(true)
        ref.current?.focus()
    }

    const onSubmit = ({target}: React.FocusEvent<HTMLInputElement>) => {
        if(target.value){
            onAdd(target.value)
        }
        setEditorOpen(false)
    }
    return !editorOpen ? <div className="answer-button-selected red-button" onClick={onAddClick}>
+
        </div> :
            <div>
                <input ref={(input)=> input && input.focus()} onBlur={onSubmit} type="text" className="answer-adder-input"/>
            </div>
}