import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import GamesService from '../GamesService';
import ArchiveService from '../ArchiveService';

const GameDetailsComponent = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [saved, setSaved] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    document.title = 'Game Details';
    GamesService.getGameById(id).then((res) => {
      setGame(res.data);
    });
    ArchiveService.getArchive().then((res) => {
      setSaved(res.data.some(item => item.game_id === id));
    }).catch((err) => {
      console.error(err);
    });
  }, [id]);

  const openModal = () => {
    setModalOpen(true);
    setRating(0);
    setNotes('');
    setModalError('');
  };

  const saveToArchive = () => {
    ArchiveService.addToArchive({
      game_id: game.id,
      game_name: game.name,
      game_image: game.image,
      rating: rating || null,
      notes: notes || null
    }).then(() => {
      setSaved(true);
      setModalOpen(false);
    }).catch((err) => {
      console.error(err);
      setModalError(err.response?.data || 'Failed to save');
    });
  };

  return (
    <>
      <div className="page">
        <h2>Game Details</h2>
        <div className="game-details">
          <h3>{game.name}</h3>
          {game.image && <img src={game.image} alt={game.name} />}
          <p>Released: {game.released}</p>
          <p>Rating: {game.rating}</p>
          <p>Platforms: {game.platforms ? game.platforms.join(', ') : ''}</p>
          <p>Genres: {game.genres ? game.genres.join(', ') : ''}</p>
          <p>{game.description}</p>
          <div className="card-footer">
            {saved
              ? <span className="saved-badge">&#10003; Saved</span>
              : <button className="btn btn-primary" onClick={openModal}>Add To List</button>
            }
          </div>
        </div>
        <Link to="/search">Back to Search</Link>
      </div>

      {modalOpen && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="modal">
            <h3>Add: {game.name}</h3>
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
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveToArchive}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetailsComponent;
