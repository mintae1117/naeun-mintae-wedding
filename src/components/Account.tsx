import React, { useState } from "react";
import type { WeddingData } from "../types";
import { IoChevronDown } from "react-icons/io5";

interface AccountProps {
  data: WeddingData;
}

export const Account: React.FC<AccountProps> = ({ data }) => {
  // 신랑측/신부측 계좌 그룹 펼침 여부 (기본은 둘 다 접힘)
  const [openGroups, setOpenGroups] = useState({
    groom: false,
    bride: false,
  });

  const toggleGroup = (side: "groom" | "bride") => {
    setOpenGroups((prev) => ({ ...prev, [side]: !prev[side] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  };

  const groups = [
    { side: "groom", label: "신랑측", accounts: data.accounts.groom },
    { side: "bride", label: "신부측", accounts: data.accounts.bride },
  ] as const;

  return (
    <section className="account-section">
      <h2 className="section-title">ACCOUNT</h2>
      <p className="section-subtitle">마음 전하실 곳</p>

      <p className="account-notice">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
      </p>

      <div className="account-content">
        {groups.map(({ side, label, accounts }) => (
          <div className="account-group" key={side}>
            <button
              className={`account-toggle ${openGroups[side] ? "open" : ""}`}
              onClick={() => toggleGroup(side)}
              aria-expanded={openGroups[side]}
            >
              <span>{label}</span>
              <IoChevronDown className="account-toggle-icon" />
            </button>

            {openGroups[side] && (
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
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
