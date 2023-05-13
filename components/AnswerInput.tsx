import {SyntheticEvent} from "react";

export interface AnswerInputProps {
    onSubmit: (input: HTMLInputElement)=>void
    text?: string
}

export const AnswerInput = ({onSubmit, text=""}: AnswerInputProps) => {
    const onEnter = (event: SyntheticEvent)=>{
        if((event.nativeEvent as KeyboardEvent)?.key=="Enter"){
            onSubmit(event.target as HTMLInputElement)
        }
    }
    return (
        <div>
            <input ref={(input) => input && input.focus()} onBlur={event=>onSubmit(event.target)} type="text"
                   className="answer-adder-input" onKeyDown={onEnter} defaultValue={text}/>
        </div>
    )
}