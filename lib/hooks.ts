import {useState} from "react";
import {Session} from "./Types";

export const useSession = () => {
    const [logged, setLogged] = useState(false)

    const logIn = () => {
        setLogged(true)
    }

    const logOut = () => {
        setLogged(false)
    }

    return {logged, logIn, logOut} as Session
}