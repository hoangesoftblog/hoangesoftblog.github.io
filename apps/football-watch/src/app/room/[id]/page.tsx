'use client';

import {Suspense} from "react";
import Room from "./room-correct";

export default function Page({params}: Readonly<{params: {id: string}}>) {
    const {id} = params;
    return (
        <Room id={id} />
    )
}