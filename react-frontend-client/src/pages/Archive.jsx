import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/NavComponent';
import Stars from '../components/StarsComponent';
import RetroArchiveService from '../RetroArchiveService';

const Archive = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [modalError, setModalError] = useState('');

  const loadArchive = () => {
    RetroArchiveService.getArchive().then((res) => {
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
    RetroArchiveService.updateArchiveItem(modal.id, { rating: rating || null, notes: notes || null }).then(() => {
      setModal(null);
      loadArchive();
    }).catch((err) => {
      console.error(err);
      setModalError(err.response?.data || 'Failed to save');
    });
  };

  const deleteItem = (id) => {
    if (!confirm('Remove this game from your list?')) return;
    RetroArchiveService.deleteArchiveItem(id).then(() => {
      setItems(prev => prev.filter(item => item.id !== id));
    }).catch((err) => {
      console.error(err);
    });
  };

  if (loading) return (
    <>
      <Nav />
      <div className="loading">Loading…</div>
    </>
  );

  return (
    <>
      <Nav />
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
                  <div className="item-name">{item.game_name}</div>
                  <Stars value={item.rating || 0} />
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
              <Stars value={rating} onChange={setRating} />
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

export default Archive;
