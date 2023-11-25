import Link from "next/link";
import {MatchStatus} from "./vebo-definitions";

export default async function VeboList() {
    console.log("VeboList rendering...");

    let jsonValue: {status: number, data: MatchStatus[]};
    try {
        // There are 2 API:
        // 1) is "/api/featured", updated every 120s
        // 2) is "/api/live", updated every 10s
        const response = await fetch("https://api.vebo.xyz/api/match/featured", {
            next: {revalidate: 60}
        });
        if (response.ok) {
            jsonValue = await processJSON(response);
        }
        else {
            console.log("Response not ok");
            console.log(response);
            throw new Error(await response.text())
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }

    const {data} = jsonValue!;
    const dataRendered = data
        .filter((m: MatchStatus) => m.is_live)
        .map((m: MatchStatus) => {
        return (
            <div key={m.id} className='mb-5'>
                <span>{m.commentators?.[0].name}</span>
                <p><b>{m.name}</b></p>
                <button><Link href={`/room/vebo/${m.id}`}>Watch Now</Link></button>
            </div>
        )
    })

    
    console.log("VeboList rendered complete!!!");
    return (
        <div>
            <h2>List match vebotv.net</h2>
            {dataRendered}
        </div>

    )
}


async function processJSON(response: Response) {
    return (response.json());
}