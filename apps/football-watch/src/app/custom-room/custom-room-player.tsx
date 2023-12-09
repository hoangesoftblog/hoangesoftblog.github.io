'use client';

import { RoomStream } from "@/app/socolive-definitions";
import clsx from "clsx";
import { useState } from "react";
import ReactPlayer from "react-player/file";


// Todo: Add the match detail panel, using useEffect subscription
export default function CustomRoomPlayer({ className = "" } : { className?: string }) {
    // 1) data is initial value from getting from server,
    // and update each time user re-select the quality option.
    // 2) The videoUrl is not in the same origin -> stuck "strict-origin-when-cross-origin"
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [input, setInput] = useState<string>("");

    // let videoComponent: ReactPlayer | undefined = undefined;

    return (
        <>
            {videoUrl ?
                (<ReactPlayer key={videoUrl} url={videoUrl} controls={true}
                    wrapper={undefined}
                    width={"100%"} height={"100%"}
                    config={({
                        file: ({
                            forceHLS: true,
                            hlsOptions: {
                                // xhrSetup: function (xhr: XMLHttpRequest, url: string) {
                                //     console.log(arguments);
                                //     xhr.setRequestHeader("Referer", "https://xlz.plvb.xyz/");
                                // },
                            }
                        })
                    } as any)}
                />) :
                (<h2>Enter video URL, and click <button>Apply</button> to play.</h2>
                )}

            <div className="mt-4">
                <input className="border-2 mr-4 border-black" type="text" value={input} onChange={(e) => {setInput(e.target.value)}}/>
                <button className="border-2 px-2 border-gray-300 rounded-sm" onClick={() => {setVideoUrl(input);}}>Apply</button>
            </div>
        </>
    )
}