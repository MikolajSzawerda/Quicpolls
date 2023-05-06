import {useEffect, useState} from "react";
import {SessionTools} from "./Types";
import { Session } from "@supabase/supabase-js";
import {supaClient} from "./supa-client";
import {useNavigate} from "react-router-dom";
export const useSession = () => {
    const [currentSession, setCurrentSession] = useState<Session|null>()
    const navigate = useNavigate()
    useEffect(() => {
        supaClient.auth.getSession().then(({data: {session}}) => {
            setCurrentSession(session)
            supaClient.auth.onAuthStateChange((_event, session)=>{
                setCurrentSession(session)
            })
        })
    }, [])

    const logOut = () => {
        supaClient.auth.signOut().then()
        navigate("/auth")
    }

    return {currentSession, logOut} as SessionTools
}