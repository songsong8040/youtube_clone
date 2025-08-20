import axios from "axios";

export default class FakeYoutube {
    constructor() {
        // 생성자에 설정할 게 있다면 여기 추가 가능
    }

    // 외부에서 사용하는 메인 메서드
    async search(keyword) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    // 내부 전용: 검색용
    async #searchByKeyword() {
        return axios
            .get(`/videos/search.json`)
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
        return axios
            .get(`/videos/popular.json`)
            .then(res => res.data.items);
    }
}