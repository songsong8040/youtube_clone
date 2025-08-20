import axios from "axios";

export const searchVideos = (keyword) => {
    const url = `/videos/${keyword ? 'search' : 'popular'}.json`;
    return axios.get(url).then(res => res.data.items);
}