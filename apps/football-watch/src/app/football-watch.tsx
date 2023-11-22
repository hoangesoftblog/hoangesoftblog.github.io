// "use client";

import Image from 'next/image';
import { AllRoomsStatus, Room } from './definitions';
import Link from 'next/link';

export default async function FootballWatch() {
    // Todo: This component should be used with ErrorBoundary
    console.log("Render FootballWatch")
    let jsonValue: AllRoomsStatus;

    try {
        const response = await fetch("https://json.vnres.co/all_live_rooms.json");
        if (response.ok) {
            const temp = await response.text();
            const jsonText = temp.slice(15, -1);
            jsonValue = JSON.parse(jsonText);
        }
        else {
            console.log("Response not ok");
            console.log(response);
        }
    }
    catch (error) {
        console.error(error);
    }

    const data = jsonValue!.data.hot;
    
    // (data
    //     .sort((a, b) => (
    //             (a as any)["anchor"]["nickName"].localeCompare((b as any)["anchor"]["nickName"])
    //         )
    //     ).forEach((v: Object) => {
    //         console.log((v as any)["anchor"]["nickName"]);
    //     })
    // );

    // function handleClick(roomNum: number) {
    //     try {
    //         const response = await fetch(`https://json.vnres.co/room/${roomNum}/detail.json`);
    //         if (response.ok) {
    //             const temp: string = await response.text();
    //             const jsonText = temp.slice(7, -1);
    //             const jsValue = JSON.parse(jsonText);
    //             const streamData = jsValue["data"]["stream"] as Array<Object>;
    //             console.log(streamData.length);
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    // Image can't have different hosts without config
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    const dataRendered = data.map((room: Room) => {
        const anchor = room.anchor;
        return (
            <div key={anchor.uid} className='mb-5'>
                <Image src={anchor.cutOutIcon} alt={`${anchor.nickName} icon`}
                className='' width={76} height={76}
                />
                <span>{anchor.nickName}</span>
                <p><b>{room.title}</b></p>
                <button><Link href={`/room/${room.roomNum}`}>Go to room</Link></button>
            </div>
            )
        })

    return (
        <div>
            <h2>List BLV Socolive đang live</h2>
            {dataRendered}
        </div>
    )
}