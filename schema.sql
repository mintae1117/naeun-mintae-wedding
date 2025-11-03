CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO guestbook (id, author, message, date) VALUES
  ('1', '김친구', '결혼 진심으로 축하해! 행복하게 잘 살아~ 💕', '2025-10-20'),
  ('2', '박동료', '두 분의 앞날에 사랑과 웃음이 가득하길 바랍니다. 진심으로 축하드려요!', '2025-10-21');
