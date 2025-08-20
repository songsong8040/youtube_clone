import axios from "axios";

export default class FakeYoutubeClient {
    async search() {
        return axios.get(`/videos/search.json`);
    }

    async videos() {
        return axios.get(`/videos/popular.json`);
    }

    async channels() {
        return axios.get(`/videos/channel.json`);
    }

    async playlists() {
        return axios.get(`/videos/channelVideos.json`);
    }

    async playlistItems() {
        return axios.get(`/videos/playlistItems.json`);
    }
}