import { RoomDetailsStatus } from "../../definitions";

// export const dynamic = 'force-dynamic' // defaults to force-static


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log("API - Getting Room Details - id: " + id);

    console.log('Fake limit 3s...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Fake limit complete...');

    let res;
    try {
        res = await fetch(`https://json.vnres.co/room/${id}/detail.json`, {
            next: {revalidate: 0},
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
    const jsonTxt = txt.slice(7, -1);
    const jsonValue: RoomDetailsStatus = JSON.parse(jsonTxt);

    if (jsonValue.code !== 200) {
        // let tempRes = new Response({jsonValue.code, jsonValue.msg});
        return Response.error();
    }

    return Response.json(jsonValue)
}