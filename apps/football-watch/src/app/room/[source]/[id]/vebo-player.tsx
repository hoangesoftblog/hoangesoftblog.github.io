'use client';

import { Stream, MatchStream, MatchStreamNetwork, MatchStatus } from "@/app/vebo-definitions";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/file";

function preloadUrl(url: string) {
    void fetch(url);
}

export default function VeboPlayer({ data }: Readonly<{ data: MatchStatus }>) {
    const {id} = data;
    
    const [matchStream, setMatchStream] = useState<MatchStream | null>(null);
    const [videoUrl, setVideoUrl] = useState<string>("");

    preloadUrl(`https://api.vebo.xyz/api/match/${id}/meta`);

    useEffect(() => {
        fetch(`https://api.vebo.xyz/api/match/${id}/meta`)
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error("Fetch not successful");
            }
        })
        .then((json: MatchStreamNetwork) => {
            // When match is not live yet, 
            // json = { data: null, status: 1}
            console.log(json);
            
            const {data: tempStream} = json;


            setMatchStream(tempStream);

            const tempUrl = tempStream.play_urls?.[0].url;
            if (!tempUrl) {
                throw new Error("Invalid URL");
            }
            setVideoUrl(tempUrl);

            // const url = new URL(tempUrl);
            // const {host, pathname, search, hash} = url;
            // const fixedUrl = new URL(`/api/proxy/${host}${pathname}${search}${hash}`, `${window.location.origin}/proxy`);
            // console.log(fixedUrl.href);
            // setVideoUrl(fixedUrl.href);
        })
        .catch(error => {
            // Maybe catching client-fetch error
            // Or catching errors from above statements
            throw new Error(error);
        })
    }, []);


    function handleClick(link: string) {
        return function () {
            setVideoUrl(link);
        }
    }

    const rendered = (matchStream)
        ? (<div>
            <h1>VeboPlayer</h1>
            {videoUrl && <ReactPlayer url={videoUrl} controls={true}
                config={{
                    file: {
                        forceHLS: true,
                        hlsOptions: {
                            xhrSetup: function (xhr: XMLHttpRequest, url: string) {
                                console.log(arguments);
                                // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                                // xhr.setRequestHeader("Access-Control-Allow-Headers", 
                                //     "Content-Type, User-Agent, If-Modified-Since, Cache-Control, Range");
                                // xhr.setRequestHeader("Access-Control-Expose-Headers", 
                                //     "Date, Server, Content-Type, Content-Length");
                                // xhr.setRequestHeader("method", "GET");
                                // xhr.setRequestHeader("referer", "*");
                                // xhr.setRequestHeader("origin", "*");
                                // xhr.open("GET", videoUrl);                           
                            },
                        }
                    }
                }}
                wrapper={undefined}
            />}
            <p><b>Playing: </b> {videoUrl}</p>
            <div>
                {matchStream!.play_urls.map((e: Stream) => {
                    return (
                        <button key={e.name}
                            className="mr-4"
                            onClick={handleClick(e.url)}
                        >{e.name}</button>
                    )
                })}
            </div>
        </div>)
        : (<p>Loading</p>);

    return (
        <>
            {rendered}
        </>
    );
}