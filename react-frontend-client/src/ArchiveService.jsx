import axios from 'axios';

const ARCHIVE_API_BASE_URL = import.meta.env.VITE_API_URL + '/archive' || 'http://localhost:3000/archive';

class ArchiveService {
  getArchive() {
    return axios.get(`${ARCHIVE_API_BASE_URL}/`, { withCredentials: true });
  }

  addToArchive(gameData) {
    return axios.post(`${ARCHIVE_API_BASE_URL}/`, gameData, { withCredentials: true });
  }

  updateArchiveItem(id, data) {
    return axios.put(`${ARCHIVE_API_BASE_URL}/${id}`, data, { withCredentials: true });
  }

  deleteArchiveItem(id) {
    return axios.delete(`${ARCHIVE_API_BASE_URL}/${id}`, { withCredentials: true });
  }
}

export default new ArchiveService();
