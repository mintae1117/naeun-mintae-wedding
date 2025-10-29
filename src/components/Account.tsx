import React, { useState } from "react";
import type { WeddingData } from "../types";

interface AccountProps {
  data: WeddingData;
}

export const Account: React.FC<AccountProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  };

  const accounts =
    activeTab === "groom" ? data.accounts.groom : data.accounts.bride;

  return (
    <section className="account-section">
      <h2 className="section-title">ACCOUNT</h2>
      <p className="section-subtitle">마음 전하실 곳</p>

      <div className="account-content">
        <div className="account-tabs">
          <button
            className={`tab-btn ${activeTab === "groom" ? "active" : ""}`}
            onClick={() => setActiveTab("groom")}
          >
            신랑측
          </button>
          <button
            className={`tab-btn ${activeTab === "bride" ? "active" : ""}`}
            onClick={() => setActiveTab("bride")}
          >
            신부측
          </button>
        </div>

        <div className="account-list">
          {accounts.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-info">
                <p className="account-holder">{account.holder}</p>
                <p className="account-detail">
                  {account.bank} {account.accountNumber}
                </p>
              </div>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(account.accountNumber)}
              >
                복사
              </button>
            </div>
          ))}
        </div>

        <div className="account-notice">
          <p>축하의 마음을 담아 보내주시는 따뜻한 마음에 감사드립니다.</p>
        </div>
      </div>
    </section>
  );
};
