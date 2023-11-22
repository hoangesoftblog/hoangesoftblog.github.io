'use client';

import { notFound } from "next/navigation";
import {Room, RoomDetailsStatus, Stream} from "../../definitions";

// Todo: Add the match detail panel, using useEffect subscription
export default async function Room({id}: Readonly<{id: string}>) {
    console.log("Rendering FootballWatch Room");
    let detail: RoomDetailsStatus;
    try {
        // Todo: Will resolve to error "Failed to parse URL from /api/room?id=9912043"
        const response = await fetch(`/api/room?id=${id}`);
        if (response.ok) {
            detail = await response.json();
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
        // throw new Error("Unknow error: " + error);
    }

    const data = detail!.data;
    const {room, stream: streams}: {room: Room, stream: Stream} = data;
    console.log(streams);

    return (
        <div>
            <h1>{id}</h1>
            <h1>Room {room.anchor.nickName}</h1>
            <div>
                <p>{streams.m3u8}</p>
                <p>{streams.hdM3u8}</p>
            </div>
        </div>
    )
}