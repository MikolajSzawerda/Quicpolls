export interface BarInfo {
    id: number
    text: string
    count: number
}

export interface Answer {
    id: number,
    text: string,
    count: number
}

export interface SupaResponse {
    id?: number,
    question: string,
    shortId: string,
    answers: {[key:string]: Answer}
    isopened?: boolean
    author: string
}

export interface Session {
    logged: boolean,
    logIn?: ()=>void,
    logOut?: ()=>void
}