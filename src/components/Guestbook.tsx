import React, { useState, useEffect } from "react";
import type { WeddingData, GuestbookEntry } from "../types";

interface GuestbookProps {
  data: WeddingData;
}

const API_URL = "/api/guestbook";

export const Guestbook: React.FC<GuestbookProps> = ({ data }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(data.guestbook);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    author: "",
    message: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");

  // 방명록 데이터 가져오기
  useEffect(() => {
    const fetchGuestbook = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("방명록을 불러올 수 없습니다");
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching guestbook:", err);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: newEntry.author,
          message: newEntry.message,
          password: newEntry.password,
        }),
      });

      if (!response.ok) throw new Error("메시지를 등록할 수 없습니다");

      const savedEntry = await response.json();
      setEntries([savedEntry, ...entries]);
      setNewEntry({ author: "", message: "", password: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting guestbook entry:", err);
      setError(
        err instanceof Error ? err.message : "메시지 등록에 실패했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!deletePassword) {
      setError("비밀번호를 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/${entryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "메시지를 삭제할 수 없습니다");
      }

      setEntries(entries.filter((entry) => entry.id !== entryId));
      setDeleteTarget(null);
      setDeletePassword("");
    } catch (err) {
      console.error("Error deleting guestbook entry:", err);
      setError(
        err instanceof Error ? err.message : "메시지 삭제에 실패했습니다"
      );
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
          {showForm ? "취소" : "축하 메시지 작성하기"}
        </button>

        {showForm && (
          <form className="guestbook-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              placeholder="이름"
              className="form-input"
              value={newEntry.author}
              onChange={(e) =>
                setNewEntry({ ...newEntry, author: e.target.value })
              }
              required
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="비밀번호 (삭제시 필요)"
              className="form-input"
              value={newEntry.password}
              onChange={(e) =>
                setNewEntry({ ...newEntry, password: e.target.value })
              }
              required
              disabled={isLoading}
            />
            <textarea
              placeholder="축하 메시지를 입력해주세요"
              className="form-textarea"
              value={newEntry.message}
              onChange={(e) =>
                setNewEntry({ ...newEntry, message: e.target.value })
              }
              required
              disabled={isLoading}
            />
            <button type="submit" className="form-submit" disabled={isLoading}>
              {isLoading ? "등록 중..." : "등록하기"}
            </button>
          </form>
        )}

        <div className="guestbook-list">
          {entries.map((entry) => (
            <div key={entry.id} className="guestbook-entry">
              <div className="entry-header">
                <span className="entry-author">{entry.author}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => {
                      if (deleteTarget === entry.id) {
                        setDeleteTarget(null);
                        setDeletePassword("");
                        setError(null);
                      } else {
                        setDeleteTarget(entry.id);
                        setDeletePassword("");
                        setError(null);
                      }
                    }}
                    style={{
                      padding: "4px 8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      background: "white",
                      color: "black",
                    }}
                  >
                    {deleteTarget === entry.id ? "취소" : "삭제"}
                  </button>
                </div>
              </div>
              <p className="entry-message">{entry.message}</p>
              {deleteTarget === entry.id && (
                <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className="form-input"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    disabled={isLoading}
                    style={{ flex: 1 }}
                  />
                  <button
                    onClick={() => handleDelete(entry.id)}
                    disabled={isLoading}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      border: "1px solid #8B7355",
                      borderRadius: "4px",
                      background: "#8B7355",
                      color: "white",
                      height: "100%",
                      fontSize: "14px",
                    }}
                  >
                    {isLoading ? "삭제 중..." : "확인"}
                  </button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <span className="entry-date">{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
