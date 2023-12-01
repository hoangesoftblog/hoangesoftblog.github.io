import Image from "next/image";
import Link, { LinkProps } from "next/link";
import microphoneSVG from "../../../public/microphone.svg";

type Score = string | number | undefined;

/**
 * 
 * @param title - Name of the match
 * @returns 
 */
export default function MatchOverview({
    league,  
    title,
    score,
    room_link = "",
    commentator,
    className = "",
}: {
    league: string | undefined, 
    title: string | {home: string, away: string} | undefined,
    score: {
        home_score: Score,  
        away_score: Score,
    } | undefined,
    room_link: string,
    commentator: string | undefined,
    className: string,
}) {

    // Min-width ~ 202px
    return (
        <div className={
            `inline-block border-red-800 border-2 px-4 py-2 min-w-min 
            ${className}
        `}>
            <div className="text-center mb-2">
                <span>{league}</span>
            </div>
            <div className="flex flex-row text-xl font-bold space-x-8 mb-4">
                {/* <div className="min-w-content">Manchester United</div>
                <div>VS</div>
                <div>West Bromwich Albavion</div> */}

                {/* <div>{"Manchester United"} VS {"West Bromwich Albavion"}</div> */}
                {/* <div>{home} VS {away}</div> */}

                {typeof(title) === "string" && <div className="text-center">{title}</div>} 
                {typeof(title) === "undefined"}
                               
            </div>
            <div className="flex flex-row text-sm marker:items-center mb-2" style={{marginLeft: "-0.375em"}}>
                <div className="flex flex-row items-center gap-0 grow mr-4">
                    <Image src={microphoneSVG} alt="MC"/>
                    {commentator && <span className="">{commentator}</span>}
                </div>
                <button className="border-black border-2 rounded py-1 px-2 hover:bg-gray-500 hover:text-white">
                    <Link href={room_link}>Watch Now</Link>
                </button>
            </div>
        </div>
    )
}