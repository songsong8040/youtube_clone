import axios from "axios";

export default class YoutubeClient {
    constructor() {
        this.httpClient = axios.create({
            baseURL:'https://youtube.googleapis.com/youtube/v3',
            params: { key: import.meta.env.VITE_YOUTUBE_API_KEY},
        })
    }

    async search(params) {
        return this.httpClient.get('search', params);
    }

    async videos(params) {
        return this.httpClient.get('videos', params);
    }

    async channels(params) {
        return this.httpClient.get('channels', params);
    }

    async playlists(params) {
        return this.httpClient.get('playlists', params);
    }

    async playlistItems(params) {
        return this.httpClient.get('playlistItems', params);
    }
}
