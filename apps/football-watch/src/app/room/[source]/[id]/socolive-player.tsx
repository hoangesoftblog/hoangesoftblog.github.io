'use client';

import { RoomStream } from "@/app/socolive-definitions";
import clsx from "clsx";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/file";

type Quality = "SD" | "HD";

// Todo: Add the match detail panel, using useEffect subscription
export default function SocolivePlayer({ data, className = "" }: { data: RoomStream, className: string | undefined }) {
    // 1) data is initial value from getting from server,
    // and update each time user re-select the quality option.
    // 2) The videoUrl is not in the same origin -> stuck "strict-origin-when-cross-origin"
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [another, setAnother] = useState("");

    // let videoComponent: ReactPlayer | undefined = undefined;
    const {stream: streams} = data;

    useEffect(() => {
        setVideoUrl(data.stream.m3u8);
        return () => {
            setVideoUrl("");
        }
    }, [])

    // const videoUrl = prompt("Paste the m3u8 video url", "");
    // console.log(videoUrl);


    function handleClick(link: string) {
        return function () {
            setVideoUrl(link);
        }
    }



    return (
        <>
            {/* {videoUrl && <ReactPlayer key={videoUrl} url={videoUrl} controls={true}
                wrapper={undefined}
                width={"100%"} height={"100%"}
                config={{
                    file: {
                        forceHLS: true,
                        hlsOptions: {
                            // xhrSetup: function (xhr: XMLHttpRequest, url: string) {
                            //     console.log(arguments);
                            //     xhr.setRequestHeader("Referer", "https://xlz.plvb.xyz/");
                            // },
                        }
                    }
                }}
            />} */}

            <div className="mt-4">
                <input className="border-2 mr-4 border-black" type="text" value={another} onChange={(e) => {setAnother(e.target.value)}}/>
                <button className="border-2 px-2 border-gray-300 rounded-sm" onClick={() => {setVideoUrl(another);}}>Apply</button>
            </div>

            <div className="mt-4 mb-8">
                <div className="flex flex-row mb-2">
                    <p className="text-2xl grow">Alternative Links</p>
                    <button className="border-2 border-gray-500 px-2 rounded-md hover:bg-gray-300">Show Links</button>
                </div>
                <div className="flex gap-4">
                    {Object.entries(streams).
                        map((([type, url]: [type: string, url: string]) => {
                            return (
                                <button key={type} onClick={handleClick(url)} 
                                    className={clsx(
                                        `inline-block uppercase grow text-2xl
                                        border-neutral-900 border-2 rounded-md py-2
                                        hover:bg-gray-500`,
                                        {'bg-gray-700 text-white': url === videoUrl}
                                    )}>
                                        {type}
                                </button>
                        )
                    }))}
                </div>
            </div>

            <table className="table-auto w-full">
                <thead className="text-left border-2 border-gray-500">
                    <tr className="border-2 border-gray-500">
                        <th className="p-2 border-2 border-gray-500">Source</th>
                        <th className="p-2 border-2 border-gray-500">URL</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-gray-500">
                    {Object.entries(streams).
                        map((([type, url]: [type: string, url: string]) => (
                            <tr key={type} className="border-2 border-gray-500">
                                <td className="p-2 border-2 border-gray-500">{type}</td>
                                <td className="p-2 border-2 border-gray-500">{url}</td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </>
    )
}