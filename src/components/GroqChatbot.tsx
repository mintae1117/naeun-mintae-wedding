import { useState, useRef, useEffect } from "react";
import { BsChatDots, BsX, BsSend } from "react-icons/bs";
import "./GroqChatbot.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const GroqChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요! 김민태♥김나은 결혼식에 대해 궁금한 것이 있으신가요?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openChatbot = () => {
    setIsOpen(true);
    // 히스토리에 상태 추가 (뒤로가기 대응)
    window.history.pushState({ chatbotOpen: true }, "");
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isOpen) {
        event.preventDefault();
        closeChatbot();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message to chat
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chatbot-button ${isOpen ? "chatbot-button-hidden" : ""}`}
        onClick={openChatbot}
        aria-label="결혼식 챗봇 열기"
      >
        <BsChatDots size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <BsChatDots size={20} />
              <span>결혼식 안내 챗봇</span>
            </div>
            <button
              className="chatbot-close-button"
              onClick={closeChatbot}
              aria-label="챗봇 닫기"
            >
              <BsX size={28} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  message.role === "user"
                    ? "chatbot-message-user"
                    : "chatbot-message-assistant"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message chatbot-message-assistant chatbot-message-loading">
                <span className="chatbot-loading-dot">.</span>
                <span className="chatbot-loading-dot">.</span>
                <span className="chatbot-loading-dot">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              aria-label="메시지 보내기"
            >
              <BsSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
