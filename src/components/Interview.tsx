import React, { useState } from "react";
import type { WeddingData } from "../types";
import { motion, AnimatePresence, type Variants } from "framer-motion";

interface InterviewProps {
  data: WeddingData;
}

export const Interview: React.FC<InterviewProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="interview-section">
      <h2 className="section-title">INTERVIEW</h2>
      <p className="section-subtitle">신랑 신부에게 물어보았습니다!</p>

      <button
        className="interview-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "인터뷰 접기" : "인터뷰 읽어보기"}
      </button>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="interview-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ overflow: "hidden" }}
          >
            {data.interview.map((item, index) => (
              <motion.div
                key={index}
                className="interview-item"
                variants={itemVariants}
              >
                <h3 className="interview-question">Q. {item.question}</h3>

                <div className="interview-answers">
                  <div className="answer-box groom-answer">
                    <span className="answer-label">신랑</span>
                    <p className="answer-text">{item.groomAnswer}</p>
                  </div>

                  <div className="answer-box bride-answer">
                    <span className="answer-label">신부</span>
                    <p className="answer-text">{item.brideAnswer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
