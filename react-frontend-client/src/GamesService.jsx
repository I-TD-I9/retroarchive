import axios from 'axios';

const GAMES_API_BASE_URL = import.meta.env.VITE_API_URL + '/games' || 'http://localhost:3000/games';

class GamesService {
  searchGames(q, platform) {
    const params = platform ? { q, platform } : { q };
    return axios.get(`${GAMES_API_BASE_URL}/search`, { params, withCredentials: true });
  }

  getGameById(id) {
    return axios.get(`${GAMES_API_BASE_URL}/${id}`, { withCredentials: true });
  }
}

export default new GamesService();
