import React, { useState } from 'react';
import type { WeddingData, GuestbookEntry } from '../types';

interface GuestbookProps {
  data: WeddingData;
}

export const Guestbook: React.FC<GuestbookProps> = ({ data }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(data.guestbook);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ author: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: GuestbookEntry = {
      id: String(Date.now()),
      author: newEntry.author,
      message: newEntry.message,
      date: new Date().toISOString().split('T')[0],
    };
    setEntries([entry, ...entries]);
    setNewEntry({ author: '', message: '' });
    setShowForm(false);
  };

  return (
    <section className="guestbook-section">
      <h2 className="section-title">GUESTBOOK</h2>
      <p className="section-subtitle">축하 메시지를 남겨주세요</p>

      <div className="guestbook-content">
        <button
          className="write-message-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '취소' : '축하 메시지 작성하기'}
        </button>

        {showForm && (
          <form className="guestbook-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름"
              className="form-input"
              value={newEntry.author}
              onChange={(e) => setNewEntry({ ...newEntry, author: e.target.value })}
              required
            />
            <textarea
              placeholder="축하 메시지를 입력해주세요"
              className="form-textarea"
              value={newEntry.message}
              onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
              required
            />
            <button type="submit" className="form-submit">
              등록하기
            </button>
          </form>
        )}

        <div className="guestbook-list">
          {entries.map((entry) => (
            <div key={entry.id} className="guestbook-entry">
              <div className="entry-header">
                <span className="entry-author">{entry.author}</span>
                <span className="entry-date">{entry.date}</span>
              </div>
              <p className="entry-message">{entry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
