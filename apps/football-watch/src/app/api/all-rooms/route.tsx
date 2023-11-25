import { AllRoomsStatus } from "../../socolive-definitions";

// export const dynamic = 'force-dynamic' // defaults to force-static


export async function GET(request: Request) {
    // console.log(arguments);

    let res;
    try {
        res = await fetch(`https://json.vnres.co//all_live_rooms.json`, {
            next: {revalidate: 60},
        });
    }
    catch (error) {
        console.error("Fetch error: " + error);
        console.error(error);
        
    }

    if (!(res?.ok)) {
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

    return Response.json(jsonValue)
}