import Image from 'next/image';
import { AllRoomsStatus, RoomInfo } from './socolive-definitions';
import Link from 'next/link';
import {cookies} from 'next/headers';
import MatchOverview from './component/match_overview';
import {Fragment} from "react";

export default async function SocoliveList() {
    console.log("SocoliveList rendering...");
    
    const cookieStore = cookies();
    // Todo: This component should be used with ErrorBoundary

    let jsonValue: AllRoomsStatus;
    try {
        const response = await fetch("https://json.vnres.co/all_live_rooms.json", {
            next: {revalidate: 60}
        });
        console.log(response);
        if (response.ok) {
            jsonValue = await processJSON(response);
        }
        else {
            console.log("Response not ok");
            console.log(response);
            const responseText = await response.text();
            throw new Error(responseText);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }

    const roomInfo = jsonValue?.data.hot ?? [];
    
    // (data
    //     .sort((a, b) => (
    //             (a as any)["anchor"]["nickName"].localeCompare((b as any)["anchor"]["nickName"])
    //         )
    //     ).forEach((v: Object) => {
    //         console.log((v as any)["anchor"]["nickName"]);
    //     })
    // );

    // Image can't have different hosts without config
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    const dataRendered = roomInfo.map((room: RoomInfo) => {
        const anchor = room.anchor;
        return (
            // <div key={anchor.uid} className='mb-5'>
            //     {/* <Image src={anchor.cutOutIcon} alt={`${anchor.nickName} icon`}
            //     className='' width={76} height={76}
            //     /> */}
            //     <span>{anchor.nickName}</span>
            //     <p><b>{room.title}</b></p>
            //     <button><Link href={`/room/socolive/${room.roomNum}`}>Watch Now</Link></button>
            // </div>

                // <Fragment key={anchor.uid}>
                //     <MatchOverview 
                //         home="A" away='B' room_link={`/room/socolive/${room.roomNum}`} 
                //         commentator={anchor.nickName}
                //     />
                // </Fragment>

                <Fragment key={anchor.uid}></Fragment>
            )
        });

    console.log("SocoliveList rendered complete!!!");
    return (
        <div>
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