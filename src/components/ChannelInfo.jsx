import React from 'react';
import {useYoutubeApi} from "../context/YoutubeApiContext.jsx";
import {useQuery} from "@tanstack/react-query";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";

export default function ChannelInfo({id, name}) {
    const { youtube } = useYoutubeApi();

    const { isLoading, isError, data:url } = useQuery({
        queryKey: ['channal', id],
        queryFn: ()=> youtube.channelImageUrl(id),
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <Loading/>;
    if (isError) return <Error error={isError}/>;

    return (
        <div className="flex items-center gap-1">
            {url && <img src={url} alt={name} className="w-6 rounded-full"/>}
            {name}
        </div>
    );
}