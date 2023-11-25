import { MatchStatus, MatchStreamNetwork, Stream } from "@/app/vebo-definitions"
import { notFound } from "next/navigation";
import VeboPlayer from "./vebo-player";

export default async function VeboRoom({ id, source }: { id: string, source: string }) {
    console.log("Rendering VeboRoom - id: " + id + " - source: " + source);
    let detail: {data: MatchStatus, status: number};

    // // Match API 
    // https://api.vebo.xyz/api/match/${id}
    // // Meta API - MatchStreamMetadata
    // https://api.vebo.xyz/api/match/${id}/meta

    try {
        // Todo: Will resolve to error "Failed to parse URL from /api/room?id=9912043"
        const response = await fetch(`https://api.vebo.xyz/api/match/${id}`, {
            next: { revalidate: 60 }
        });
        if (response.ok) {
            detail = await processJSON(response);
        }
        else {
            console.error("Fetch return status not OK - room id:", id);
            console.error(response);
            if (response.status === 404) {
                notFound();
            }
            else {
                throw new Error(response.statusText);
            }
        }
    }
    catch (error) {
        console.error(error);
        throw new Error("Unknown error: " + error);
    }

    const { data } = detail;
    console.log(data);

    if (data.match_status !== "live") {
        console.error("Match not live yet - Room: Vebo - id:", id);
        notFound();
    }

    // const { play_urls }: { play_urls: Stream[] } = data;

    return (
        <div>
            <h1>VeboRoom</h1>
            <h1>{id}</h1>
            {/* <h1>Room {room.anchor.nickName}</h1> */}
            <br />
            <div>
                <h2>Video Player</h2>
                {(data.match_status !== "live") ? (
                    (<p>Match not started yet!</p>)
                ) : (
                    <VeboPlayer data={data} />
                )}
            </div>
            <br />
            {/* <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.play_urls.map((stream: Stream) => (
                            <tr key={stream.name}>
                                <td>{stream.name}</td>
                                <td>{stream.url}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}


/**
 * Process the json returned
 * The returned response.text is appended with "detail(" + <correct-json> + ")"
 * @param: txt - string
 * @returns JSON - JSON-ready string
 */
async function processJSON(response: Response) {
    return response.json();
}