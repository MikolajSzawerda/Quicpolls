import {RatePanel} from "../../../components/RatePanel";
import QRCode from "react-qr-code";
import {useEffect, useState} from "react";
import {supaClient} from "../../../lib/supa-client";
const pollUrlBase = process.env.NEXT_PUBLIC_HOST_URL ?? ""


export default function PollPage() {
    const [pollData, setPollData] = useState<SupaResponse>()
    useEffect(()=> {
        const fetchData = async () => {
            const {data, error} = await supaClient
                .from("polls")

                .select()
            if(data){
                setPollData(data[0] as SupaResponse)
            }
        }
        fetchData().catch(console.error)

    }, [])
    const pollUrl = `${pollUrlBase}/${pollData?.shortId}`

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