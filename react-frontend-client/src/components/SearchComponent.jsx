import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GamesService from '../GamesService';
import ArchiveService from '../ArchiveService';

const PLATFORMS = [
  { id: '', name: 'All' },
  { id: '49', name: 'NES' },
  { id: '79', name: 'SNES' },
  { id: '83', name: 'Nintendo 64' },
  { id: '105', name: 'GameCube' },
  { id: '26', name: 'Game Boy' },
  { id: '43', name: 'Game Boy Color' },
  { id: '24', name: 'Game Boy Advance' },
  { id: '27', name: 'PlayStation' },
  { id: '15', name: 'PlayStation 2' },
  { id: '17', name: 'PSP' },
  { id: '80', name: 'Xbox' },
  { id: '167', name: 'Genesis' },
  { id: '74', name: 'SEGA Master System' },
  { id: '106', name: 'Dreamcast' },
  { id: '23', name: 'Atari 2600' },
  { id: '12', name: 'Neo Geo' }
];

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [archiveIds, setArchiveIds] = useState(new Set());
  const [modal, setModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    ArchiveService.getArchive().then((res) => {
      setArchiveIds(new Set(res.data.map(item => item.game_id)));
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const doSearch = () => {
    if (!query.trim()) return;
    setStatus('loading');
    setResults([]);
    GamesService.searchGames(query, platform).then((res) => {
      setResults(res.data);
      setStatus(res.data.length ? 'done' : 'empty');
    }).catch((err) => {
      console.error(err);
      setStatus('error');
    });
  };

  const openModal = (game) => {
    setModal(game);
    setRating(0);
    setNotes('');
    setModalError('');
  };

  const saveToArchive = () => {
    ArchiveService.addToArchive({
      game_id: modal.id,
      game_name: modal.name,
      game_image: modal.image,
      rating: rating || null,
      notes: notes || null
    }).then(() => {
      setArchiveIds(prev => new Set([...prev, modal.id]));
      setModal(null);
    }).catch((err) => {
      console.error(err);
      setModalError(err.response?.data || 'Failed to save');
    });
  };

  return (
    <>
      <div className="page">
        <h1>Search Retro Games</h1>
        <div className="search-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && doSearch()}
          />
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={doSearch}>Search</button>
        </div>

        {status === 'loading' && <div className="loading">Searching…</div>}
        {status === 'empty' && <div className="empty">No games found.</div>}
        {status === 'error' && <div className="empty">Search failed.</div>}

        {results.length > 0 && (
          <div className="game-grid">
            {results.map(game => (
              <div key={game.id} className="game-card">
                <img src={game.image || ''} alt={game.name}
                  onError={(e) => e.target.style.visibility = 'hidden'} loading="lazy" />
                <div className="card-body">
                  <div className="card-name"><Link to={`/games/${game.id}`}>{game.name}</Link></div>
                  <div className="card-year">{game.released ? game.released.slice(0, 4) : '—'}</div>
                  <div className="card-footer">
                    {archiveIds.has(game.id)
                      ? <span className="saved-badge">&#10003; Saved</span>
                      : <button className="btn btn-primary btn-sm" onClick={() => openModal(game)}>Add To List</button>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <h3>Add: {modal.name}</h3>
            <div className="field">
              <label>Rating</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value="0">No rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea placeholder="Any thoughts about this game…"
                value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="error">{modalError}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveToArchive}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
