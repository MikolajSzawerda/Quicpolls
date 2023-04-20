import {RateBar} from "../../../components/RateBar";
import {RatePanel} from "../../../components/RatePanel";
import QRCode from "react-qr-code";
const pollUrl = "https://mszawerd.toadres.pl"
const pollInfos: BarInfo[] = [
    {
        id: 1,
        text: "Interesting",
        count: 10
    },
    {
        id: 2,
        text: "I am impressed",
        count: 20
    },
    {
        id: 3,
        text: "It looks modern",
        count: 40
    },
    {
        id: 4,
        text: "No idea",
        count: 5
    },
]

export default function PollPage() {
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

                <h1>How do you like the surveys?</h1>
                <RatePanel  data={pollInfos}/>
            </div>
        </main>
    </>
}