'use client';

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomDetailStatus, RoomInfo, Stream } from "../../../socolive-definitions";
import SocolivePlayer from "./socolive-player";

// Todo: Add the match detail panel, using useEffect subscription
export default function Room({ id }: Readonly<{ id: string }>) {
    const [detail, setDetail] = useState<RoomDetailStatus | undefined>(undefined);

    console.log("Rendering Socolive Room - ID:", id);

    useEffect(() => {
        fetch(`/api/room?id=${id}`)
            .then((response: Response) => {
                console.log("Socolive Room - ID:", id);

                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Fetch not successful");
                }
            })
            .then((json) => {
                if (json.code !== 200) {
                    throw new Error("There's an error: " + json.code + " - " + json.message);
                }
                else {
                    setDetail(json);
                }
            })
            .catch(error => {
                // Maybe catching client-fetch error
                // Or catching errors from above statements
                throw new Error(error);
            })
    }, []);

    console.log("Finishing Socolive Room - ID:", id);

    if (detail) {
        const data = detail.data;
        const { room, stream: streams }: { room: RoomInfo, stream: Stream } = data;
        console.log(streams);

        return (
            <div>
                <h1>{id}</h1>
                <h1>Room {room.anchor.nickName}</h1>
                <br />
                <div>
                    <h2>Video Player</h2>
                    <SocolivePlayer data={detail.data} />
                </div>
                <br />
                <div>
                    <h3>Stream URL</h3>
                    <p>{streams.m3u8}</p>
                    <p>{streams.hdM3u8}</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <p>Currently empty</p>
        )
    }
}