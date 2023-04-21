interface BarInfo {
    id: number
    text: string
    count: number
}

interface Answer {
    id: number,
    text: string,
    count: number
}

interface SupaResponse {
    id: number,
    question: string,
    shortId: string,
    answers: Answer[]
}