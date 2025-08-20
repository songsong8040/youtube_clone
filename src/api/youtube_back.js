import axios from "axios";

export default class Youtube {
    constructor() {
        this.httpClient = axios.create({
            baseURL:'https://youtube.googleapis.com/youtube/v3',
            params: { key: import.meta.env.VITE_YOUTUBE_API_KEY},
        })
    }

    // 외부에서 사용하는 메인 메서드
    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    // 내부 전용: 검색용
    async #searchByKeyword(keyword) {
        return this.httpClient
            .get('search', { params: {
                    part: 'snippet',
                    maxResults: 25,
                    type: 'video',
                    q: keyword
                } })
            .then(res => res.data.items)
            .then(items =>
                items.map(item => ({
                    ...item,
                    id: item.id?.videoId || item.id
                }))
            );
    }

    // 내부 전용: 인기 영상용
    async #mostPopular() {
        return this.httpClient
            .get('videos', { params: {
                    part: 'snippet',
                    maxResults: 25,
                    chart: 'mostPopular'
                } })
            .then(res => res.data.items);
    }
}