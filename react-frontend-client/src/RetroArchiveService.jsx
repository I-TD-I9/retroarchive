import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class RetroArchiveService {
    searchGames(q) {
        return axios.get(`${API_BASE_URL}/games/search`, { params: { q } });
    }

    getArchive() {
        return axios.get(`${API_BASE_URL}/archive`);
    }

    addToArchive(gameData) {
        return axios.post(`${API_BASE_URL}/archive`, gameData);
    }

    updateArchiveItem(id, data) {
        return axios.put(`${API_BASE_URL}/archive/${id}`, data);
    }

    deleteArchiveItem(id) {
        return axios.delete(`${API_BASE_URL}/archive/${id}`);
    }
}

export default new RetroArchiveService();
