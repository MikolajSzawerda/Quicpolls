import {PollCard} from "../../components/PollCard";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supaClient} from "../../lib/supa-client";
import {SupaResponse} from "../../lib/Types";

export default function PollsListingPage() {
    const navigate = useNavigate()
    const [polls, setPolls] = useState<SupaResponse[]>([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const {data, error} = await supaClient
                .from("polls")
                .select()
            if(error){
                console.error(error)
                return []
            }
            return data as SupaResponse[]
        }
        fetchData().then(setPolls)
    }, [])
    return <main className="poll-listing-panel">
        <h1 style={{textAlign: "center"}}>My polls</h1>
        <div className="poll-listing-polls">
            {polls.map((poll, i) => {
                return <PollCard data={poll} key={i} onOpen={() => navigate(`/polls/${poll.shortId}`)}/>
            })
            }

        </div>
        <div className="poll-listing-add" onClick={()=>navigate("/editor")}>Add new poll!</div>
    </main>
}