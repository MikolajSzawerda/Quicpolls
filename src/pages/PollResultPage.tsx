import {useParams} from "react-router-dom";
import {SupaResponse} from "../../lib/Types";
import {useEffect, useState} from "react";
import {supaClient} from "../../lib/supa-client";
import {RatePanel} from "../../components/RatePanel";
import QRCode from "react-qr-code";
const pollUrlBase = import.meta.env.NEXT_PUBLIC_HOST_URL ?? ""


export const PollResultPage= () => {
    const {pollId} = useParams();
    const [pollData, setPollData] = useState<SupaResponse>()
    useEffect(()=> {
        const fetchData = async () => {
            const {data} = await supaClient
                .from("polls")
                .select()
                .eq('shortId', pollId)
                .limit(1)
            if(data){
                setPollData(data[0] as SupaResponse)
            }
        }
        fetchData().catch(console.error)
        console.log("API call done!")
    }, [])
    const pollUrl = `${pollUrlBase}/${pollId}`

    return <>
        <main className="poll-info">
            <div className="poll-join-panel">
                <div>
                    <h1>PARTICIPATE NOW</h1>
                    <div>To take part, open the survey inside the app</div>
                </div>
                <div className="poll-qr">
                    <QRCode value={pollUrl} style={{height: "auto", maxWidth: "75%", width: "75%"}}/>
                    <b>Open app with QR code</b>
                </div>
            </div>
            <div className="poll-result-panel">
                { pollData && (
                    <>
                        <h1>{pollData.question}</h1>
                        <RatePanel {...pollData}/>
                    </>
                )
                }

            </div>
        </main>
    </>
}