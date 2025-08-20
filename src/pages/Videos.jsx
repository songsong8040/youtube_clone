import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import VideoCard from "../components/VideoCard.jsx";
import FakeYoutube from "../api/fakeYoutube.js";
import Youtube from "../api/youtube.js";
import {useYoutubeApi} from "../context/YoutubeApiContext.jsx";

export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi();

    const { isLoading, isError, data: videos} = useQuery({
        queryKey:['videos', keyword],
        queryFn: () => youtube.search(keyword),
        staleTime: 1000 * 60,
    });

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={isError}/>;

    return (
        <div className="px-4 pt-20 pb-4 w-full">
            {videos && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {videos?.map((video) => <VideoCard key={video.id} video={video}/>)}
                </ul>
            )}
        </div>
    );
}