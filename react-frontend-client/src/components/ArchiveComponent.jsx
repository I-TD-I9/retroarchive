import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArchiveService from '../ArchiveService';

const ArchiveComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [modalError, setModalError] = useState('');

  const loadArchive = () => {
    ArchiveService.getArchive().then((res) => {
      setItems(res.data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => { loadArchive(); }, []);

  const openEdit = (item) => {
    setModal(item);
    setRating(item.rating || 0);
    setNotes(item.notes || '');
    setModalError('');
  };

  const saveEdit = () => {
    ArchiveService.updateArchiveItem(modal.id, { rating: rating || null, notes: notes || null }).then(() => {
      setModal(null);
      loadArchive();
    }).catch((err) => {
      console.error(err);
      setModalError(err.response?.data || 'Failed to save');
    });
  };

  const deleteItem = (id) => {
    if (!confirm('Remove this game from your list?')) return;
    ArchiveService.deleteArchiveItem(id).then(() => {
      setItems(prev => prev.filter(item => item.id !== id));
    }).catch((err) => {
      console.error(err);
    });
  };

  if (loading) return <div className="loading">Loading…</div>;

  return (
    <>
      <div className="page">
        <h1>My List</h1>

        {items.length === 0 ? (
          <div className="empty">
            No games yet. <Link to="/search">Search for games</Link> to add some!
          </div>
        ) : (
          <div className="archive-list">
            {items.map(item => (
              <div key={item.id} className="archive-item">
                <img src={item.game_image || ''} alt={item.game_name}
                  onError={(e) => e.target.style.visibility = 'hidden'} loading="lazy" />
                <div className="item-info">
                  <div className="item-name"><Link to={`/games/${item.game_id}`}>{item.game_name}</Link></div>
                  <div className="item-rating">{item.rating ? `${item.rating} / 5` : 'No rating'}</div>
                  <div className="item-notes">{item.notes || 'No notes'}</div>
                  <div className="item-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => openEdit(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>Remove</button>
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
            <h3>Edit: {modal.game_name}</h3>
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
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="error">{modalError}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArchiveComponent;
