import React, {useState} from 'react';
import {formatAgo, formatterKo, parseDuration} from "../util/date.js";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";
import {useYoutubeApi} from "../context/YoutubeApiContext.jsx";
export default function VideoCard({video, type}) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    const isList = type === 'list';

    const { youtube } = useYoutubeApi();

    const { title, thumbnails, channelTitle, publishedAt, channelId } = video.snippet;
    const { duration } = video.contentDetails;
    const { viewCount } = video.statistics;

    const thumb =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url;

    const { isLoading, isError, data:url } = useQuery({
        queryKey: ['channal', channelId],
        queryFn: ()=> youtube.channelImageUrl(channelId),
    })

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={isError}/>;

    return (
        <li onClick={()=>{navigate(`/videos/watch/${video.id}`, { state: { video } })}}
            className={`flex gap-2 cursor-pointer ${isList ? 'flex-row' : 'flex-col'}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`relative rounded-lg bg-gray-200 aspect-[16/9] overflow-hidden leading-none ${isList ? 'basis-3/7 shrink-0' : ''}`}
            >
                {/* 썸네일 항상 아래에 */}
                <img
                    src={thumb}
                    alt={title}
                    className="w-full h-full object-cover absolute inset-0 z-0"
                />

                {/* 호버 시 iframe이 썸네일 위에 뜨도록 */}
                {(hovered && !isList) && (
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0`}
                        className="absolute inset-0 w-[100.5%] h-[100.5%] -left-[0.25%] -top-[0.25%] block z-10 pointer-events-none"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={title}
                    />
                )}

                {/* duration은 호버 아닐 때만 */}
                {(!hovered || isList) && (
                    <div
                        className={`absolute ${isList ? 'right-1 bottom-1' : 'right-2 bottom-2'} text-xs rounded-md bg-black/50 px-1 py-0.5 text-white z-20`}>
                        {parseDuration(duration)}
                    </div>
                )}
            </div>
            <div className={`flex items-start gap-2 ${isList ? 'basis-4/7 shrink-0' : ''}`}>
                {(url && !isList) && <img src={url} alt={name} className="w-10 rounded-full"/>}
                <div className="flex flex-col gap-0.5 text-sm">
                    <div className="font-medium line-clamp-2 mb-0.5">{title}</div>
                    <div className={`font-light text-xs opacity-80 ${isList ? 'line-clamp-1' : 'line-clamp-2'}`}>{channelTitle}</div>
                    <div className="font-light text-xs flex items-center opacity-60">
                        {viewCount && <span
                            className="relative before:content-['•'] before:mx-1 first:before:content-none">조회수 {formatterKo.format(viewCount)}</span>}
                        <span
                            className="relative before:content-['•'] before:mx-1 first:before:content-none">{formatAgo(publishedAt, 'ko')}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}