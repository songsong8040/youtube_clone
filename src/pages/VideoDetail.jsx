import React from 'react';
import {useLocation} from "react-router-dom";
import ChannelInfo from "../components/ChannelInfo.jsx";
import {useDarkMode} from "../context/useDarkMode.js";
import {useYoutubeApi} from "../context/YoutubeApiContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import VideoCard from "../components/VideoCard.jsx";

export default function VideoDetail() {
    const { isDark } = useDarkMode();

    const {
        state: { video },
    } = useLocation();

    const { title, channelId, channelTitle, description } = video.snippet;

    const { youtube } = useYoutubeApi();

    const { isLoading, isError, data:videos } = useQuery({
        queryKey: ['channelVideos', channelId],
        queryFn: ()=> youtube.channelVideos(channelId),
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={isError}/>;

    return (
        <section className="pt-20 pb-4 w-full px-4 grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-5">
            <article className="lg:col-span-3 flex flex-col gap-3">
                <div className="relative rounded-xl bg-gray-200 aspect-[16/9] overflow-hidden">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&controls=1`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full"
                        title={title}
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
                    <ChannelInfo id={channelId} name={channelTitle} />
                    <pre className={` mt-2 font-pretendard p-3 whitespace-pre-wrap break-words rounded-xl font-light text-sm ${isDark ? 'bg-white/15' : 'bg-black/5'}`}>{description || '이 동영상에 추가된 설명이 없습니다.'}</pre>
                </div>
            </article>
            {videos && (
                <ul className="flex flex-col gap-2">
                    {videos?.map((video) => <VideoCard key={video.id} video={video} type="list"/>)}
                </ul>
            )}
        </section>
);
}