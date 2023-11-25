import { RoomDetailStatus, RoomInfo, Stream } from "@/app/socolive-definitions";
import { notFound } from "next/navigation";
import SocolivePlayer from "./socolive-player";

export default async function SocoliveRoom({id, ...rest}: {id: string}) {
    console.log(`Rendering FootballWatch - Room ${id}`);

    let detail: RoomDetailStatus;
    try {
        // Todo: Will resolve to error "Failed to parse URL from /api/room?id=9912043"
        const response = await fetch(`https://json.vnres.co/room/${id}/detail.json`, {
            next: {revalidate: 60}
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

    if (detail.code !== 200) {
        throw new Error("Server return status code: " + detail.code + ` - ${detail.msg}`);
    }

    const data = detail!.data;
    const {room, stream: streams}: {room: RoomInfo, stream: Stream} = data;
    console.log(streams);

    return (
        <div>
            <h1>{id}</h1>
            <h1>Room {room.anchor.nickName}</h1>
            <br/>
            <div>
                <h2>Video Player</h2>
                <SocolivePlayer data={detail.data}/>
            </div>
            <br/>
            <div>
                <h3>Stream URL</h3>
                <p>{streams.m3u8}</p>
                <p>{streams.hdM3u8}</p>
            </div>
        </div>
    )
}


/**
 * Process the json returned from URL "https://json.vnres.co/room/${id}/detail.json"
 * The returned response.text is appended with "detail(" + <correct-json> + ")"
 * @param: txt - string
 * @returns JSON - JSON-ready string
 */
async function processJSON(response: Response) {
    const txt = await response.text();
    const jsonTxt = txt.slice(7, -1);
    return JSON.parse(jsonTxt);
}