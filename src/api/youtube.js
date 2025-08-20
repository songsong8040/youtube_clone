export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async channelImageUrl(id) {
        return this.apiClient
            .channels({params: {part: 'snippet', id}})
            .then((res)=> res.data.items[0].snippet.thumbnails.default.url);
    }

    async channelVideos(channelId, pageToken) {
        // 1) 업로드 플레이리스트 ID
        const uploadsId = await this.apiClient
            .channels({ params: { part: 'contentDetails', id: channelId } })
            .then(res => res.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null);

        if (!uploadsId) return [];

        // 2) 플레이리스트 항목에서 videoId 모으기
        const pl = await this.apiClient.playlistItems({
            params: {
                part: 'snippet,contentDetails',
                playlistId: uploadsId,
                maxResults: 10,
                pageToken
            }
        })
        .then(r => r.data);

        const ids = (pl.items || [])
            .map(it => it.contentDetails?.videoId)
            .filter(Boolean);

        if (ids.length === 0) return [];

        // 3) videos.list로 풀데이터 가져오기
        const videos = await this.apiClient.videos({
            params: {
                part: 'snippet,contentDetails,statistics',
                id: ids.join(',')
            }
        }).then(r => r.data.items || [])
        .then(items =>
            items.map(item => ({
                ...item,
                id: item.id?.videoId || item.id
            }))
        );

        return videos;
    }

    // 내부 전용: 검색용
    async #searchByKeyword(keyword) {
        const searchItems = await this.apiClient
            .search({
                params: {
                    part: "snippet",
                    maxResults: 21,
                    type: "video",
                    q: keyword,
                },
            })
            .then((res) => res.data.items || []);

        const ids = searchItems.map((item) => item.id?.videoId).filter(Boolean);
        if (ids.length === 0) return [];

        const full = await this.apiClient
            .videos({
                params: {
                    part: "snippet,contentDetails,statistics",
                    id: ids.join(","),
                },
            })
            .then((r) => r.data.items || []);

        return full;
    }

    // 내부 전용: 인기 영상용
    async #mostPopular() {
        return this.apiClient
            .videos({
                params: {
                    part: 'snippet,contentDetails,statistics',
                    maxResults: 21,
                    chart: 'mostPopular'
                }
            })
            .then(res => res.data.items);
    }
}