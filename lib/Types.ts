import {Session} from "@supabase/supabase-js";

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

export interface SessionTools {
    currentSession: Session | null | undefined,
    logOut?: ()=>void
}

export interface AuthMode {
    mode: "sign_in" | "sign_out"
}