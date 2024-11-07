import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchData = async (endpoint, endpoint2 = "") => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}${endpoint2 ? `:${endpoint2}` : ''}`);
        return response.data;
    } catch (error) {
        console.error("API 호출 오류:", error);
        throw error; // 오류를 호출하는 쪽으로 전파
    }
};

export const fetchImg = async (endpoint, endpoint2) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}${endpoint2}`, {
            responseType: 'blob' // 이미지 데이터 타입 설정
        });
        return response.data;
    } catch (error) {
        console.error("API 호출 오류:", error);
        throw error; // 오류를 호출하는 쪽으로 전파
    }
};

export const postSearch = async (endpoint, category, search) => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, {
            category: category,
            search: search,
        });
        return response.data;
    } catch (error) {
        throw error; // 오류를 호출하는 쪽으로 전파
    }

};


// 사용 예시로, 다양한 엔드포인트를 추가할 수 있습니다.
export const API_ENDPOINTS = {
    menu: "/",
    projectinfo: "/projectinfo",
    slideimg: "/slideimg",
    searchtitle: "/searchtitle",
    mediaimg: "/media/images/"
    // 추가적인 엔드포인트를 여기에 정의 가능
};

export default fetchData;