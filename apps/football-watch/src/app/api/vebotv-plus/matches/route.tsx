// export const dynamic = 'force-dynamic' // defaults to force-static
import { cookies } from "next/headers";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const t = searchParams.get('t');
    console.log("API - Getting Room Details - id: ");

    // console.log(arguments);

    // console.log('Fake limit 3s...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log('Fake limit complete...');

    let res;
    const url = `https://vebotv.plus/wp-admin/admin-ajax.php?t=${(new Date()).getTime()}`;
    console.log(url);
    try {
        res = await fetch(url, {
            method: "POST",
            next: {revalidate: 0},
            headers: {
                "Access-control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        console.log("Room Detail - ID:", t);
        console.log(res);
    }
    catch (error) {
        console.error("Room Detail - ID:", t);
        console.error("Fetch error: " + error);
        console.error(error);

    }

    return res;

    // if (!(res?.ok)) {
    //     console.error("Room Detail - ID:", id);
    //     console.error("Fetch error: ", res?.status);
    //     console.error(res?.statusText);

    //     // Todo: improve the return for failure
    //     return res;
    // }

    // // TODO: Write unit test check failure at this statement
    // const txt = await res.text();               
    // const jsonTxt = txt.slice(7, -1);
    // const jsonValue: RoomDetailStatus = JSON.parse(jsonTxt);

    // if (jsonValue.code !== 200) {
    //     // let tempRes = new Response({jsonValue.code, jsonValue.msg});
    //     return Response.error();
    // }

    // console.error("Room Detail - ID:", id);
    // console.log("Finishing");

    // return Response.json(jsonValue)
}