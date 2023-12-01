import { AllRoomsStatus } from "../../../socolive-definitions";
import { cookies } from "next/headers";

// export const dynamic = 'force-dynamic' // defaults to force-static


export async function GET(request: Request) {
    console.log("Route Handler AllRooms");
    console.log("Starting");

    // console.log(arguments);

    const cookieStore = cookies();

    let res;
    try {
        res = await fetch(`https://json.vnres.co//all_live_rooms.json`, {
            credentials: "include",
            next: {revalidate: 60}
        });
        console.log("AllRoomResponse:");
        console.log(res);
    }
    catch (error) {
        console.error("AllRoomResponse:");
        console.error("Fetch error: " + error);
        console.error(error);
    }

    if (!(res?.ok)) {
        console.error("AllRoomResponse:");
        console.error("Fetch error: ", res?.status);
        console.error(res?.statusText);

        // Todo: improve the return for failure
        return res;
    }

    // TODO: Write unit test check failure at this statement
    const txt = await res.text();               
    const jsonTxt = txt.slice(15, -1);
    const jsonValue: AllRoomsStatus = JSON.parse(jsonTxt);

    if (jsonValue.code !== 200) {
        // let tempRes = new Response({jsonValue.code, jsonValue.msg});
        return Response.error();
    }

    console.log("AllRoomResponse:");
    console.log("Finishing");

    return Response.json(jsonValue)
}