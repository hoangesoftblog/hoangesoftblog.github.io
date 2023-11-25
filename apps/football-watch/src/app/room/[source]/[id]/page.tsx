import {Suspense} from "react";
import { notFound } from "next/navigation";
import {RoomInfo, RoomDetailStatus, Stream} from "../../../socolive-definitions";
import SocoliveRoom from "./socolive-room";
import VeboRoom from "./vebo-room";

export default async function Page({params}: Readonly<{params: {id: string, source: string}}>) {
    const {id, source, ...rest} = params;

    if (source === "socolive") {
        return (
            <SocoliveRoom {...params} />
        )
    }
    else if (source === "vebo") {
        return (
            <VeboRoom {...params} />
        )
    }
    else {
        notFound();
    }
}