'use client';

import { RoomStream } from "@/app/socolive-definitions";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/file";

type Quality = "SD" | "HD";

// Todo: Add the match detail panel, using useEffect subscription
export default function SocolivePlayer({ data }: { data: RoomStream }) {
    // 1) data is initial value from getting from server,
    // and update each time user re-select the quality option.
    // 2) The videoUrl is not in the same origin -> stuck "strict-origin-when-cross-origin"
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [previousUrl, setPreviousUrl] = useState<string>("");

    // let videoComponent: ReactPlayer | undefined = undefined;
    const {stream: streams} = data;

    useEffect(() => {
        setVideoUrl(data.stream.m3u8);
    }, [])

    // const videoUrl = prompt("Paste the m3u8 video url", "");
    function handleClick(link: string) {
        return function () {
            setVideoUrl(link);
        }
    }

    // console.log(videoUrl);

    return (
        <>
            {videoUrl && <ReactPlayer url={videoUrl} controls={true}
                config={
                    {
                        // file: {
                        //     forceHLS: true
                        // }
                    }
                }
                wrapper={undefined}
            />}
            <p><b>Playing: </b> {videoUrl}</p>
            <div>
                <button className="mr-4" onClick={handleClick(streams.m3u8)}>SD</button>
                <button onClick={handleClick(streams.hdM3u8)}>HD</button>
            </div>
        </>
    )
}