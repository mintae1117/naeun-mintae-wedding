import React, { useState, useEffect } from 'react';
import type { WeddingData, GuestbookEntry } from '../types';

interface GuestbookProps {
  data: WeddingData;
}

const API_URL = '/api/guestbook';

export const Guestbook: React.FC<GuestbookProps> = ({ data }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(data.guestbook);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ author: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 방명록 데이터 가져오기
  useEffect(() => {
    const fetchGuestbook = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('방명록을 불러올 수 없습니다');
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        console.error('Error fetching guestbook:', err);
        // API 실패 시 mockData 사용
        setEntries(data.guestbook);
      }
    };

    fetchGuestbook();
  }, [data.guestbook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: newEntry.author,
          message: newEntry.message,
        }),
      });

      if (!response.ok) throw new Error('메시지를 등록할 수 없습니다');

      const savedEntry = await response.json();
      setEntries([savedEntry, ...entries]);
      setNewEntry({ author: '', message: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting guestbook entry:', err);
      setError(err instanceof Error ? err.message : '메시지 등록에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
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
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              placeholder="이름"
              className="form-input"
              value={newEntry.author}
              onChange={(e) => setNewEntry({ ...newEntry, author: e.target.value })}
              required
              disabled={isLoading}
            />
            <textarea
              placeholder="축하 메시지를 입력해주세요"
              className="form-textarea"
              value={newEntry.message}
              onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
              required
              disabled={isLoading}
            />
            <button type="submit" className="form-submit" disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록하기'}
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
