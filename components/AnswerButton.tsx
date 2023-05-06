interface AnserButtonInfo {
    text: string,
    disable: boolean
}

export const AnswerButton = ({text, disable}: AnserButtonInfo) => {
    return <div className={!disable ? "answer-button-selected" : "answer-button-disable"}>
        <span>{text}</span>
    </div>
}