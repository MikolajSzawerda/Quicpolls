import {PollCard} from "../../components/PollCard";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {supaClient} from "../../lib/supa-client";
import {SupaResponse} from "../../lib/Types";
import {UserContext} from "../main";

export default function PollsListingPage() {
    const navigate = useNavigate()
    const [polls, setPolls] = useState<SupaResponse[]>([])
    const session = useContext(UserContext)
    polls.sort((a, b)=> (b.id ?? 0) - (a.id ?? 0))
    useEffect(()=>{
        const fetchData = async ()=>{
            const {data, error} = await supaClient
                .from("polls")
                .select()
                .eq("author", session.currentSession?.user.id)
            if(error){
                console.error(error)
                return []
            }
            return data as SupaResponse[]
        }
        if(session.currentSession?.user){
            fetchData().then(setPolls)
        }
    }, [])
    return <div className="poll-listing-panel">
        <h1 style={{textAlign: "center"}}>My polls</h1>
        <div className="poll-listing-polls">
            {polls.length > 0 ? polls.map((poll, i) => {
                return <PollCard data={poll} key={i} onOpen={() => navigate(`/polls/${poll.shortId}`)}/>
            }) :
                <h1 style={{textAlign: "center", color: "#b7b7b7"}}>There is nothing here now...</h1>
            }

        </div>
        <div className="poll-listing-add" onClick={()=>navigate("/edit")}>Add new poll!</div>
    </div>
}