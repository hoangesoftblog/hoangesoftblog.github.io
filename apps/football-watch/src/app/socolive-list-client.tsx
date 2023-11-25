'use client';

import Image from 'next/image';
import { AllRoomsStatus, RoomInfo } from './socolive-definitions';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { useState, useEffect } from "react";

export default function SocoliveList() {
    console.log("SocoliveList rendering...");
    const [jsonValue, setJsonValue] = useState<AllRoomsStatus | null>(null)

    useEffect(() => {
        fetch("/api/all-rooms", {
            next: { revalidate: 60 }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Fetch not successful");
            } 
        }).then((json) => {
            if (json.code !== 200) {
                throw new Error("There's an error: " + json.code + " - " + json.message);
            }
            else {
                setJsonValue(json);
            }
        })
    }, []);

    const roomInfo = jsonValue?.data.hot ?? [];

    // Image can't have different hosts without config
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    const dataRendered = roomInfo.map((room: RoomInfo) => {
        const anchor = room.anchor;
        return (
            <div key={anchor.uid} className='mb-5'>
                {/* <Image src={anchor.cutOutIcon} alt={`${anchor.nickName} icon`}
                className='' width={76} height={76}
                /> */}
                <span>{anchor.nickName}</span>
                <p><b>{room.title}</b></p>
                <button><Link href={`/room/socolive/${room.roomNum}`}>Watch Now</Link></button>
            </div>
        )
    });

    console.log("SocoliveList rendered complete!!!");
    return (
        <div>
            <h2>List BLV Socolive đang live</h2>
            {(roomInfo.length > 0)
                ? (dataRendered)
                : (<p>Room can not be fetched, please check logs.</p>)}
        </div>
    )
}


/**
 * Process the json returned from URL "https://json.vnres.co/room/${id}/detail.json"
 * The returned response.text is appended with "detail(" + <correct-json> + ")"
 * @param txt - string
 * @returns JSON object
 */
async function processJSON(response: Response) {
    const txt = await response.text();
    const jsonText = txt.slice(15, -1);
    return JSON.parse(jsonText);
}