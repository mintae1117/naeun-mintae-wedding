import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { Interview } from "./components/Interview";
import { Gallery } from "./components/Gallery";
import { WeddingDate } from "./components/WeddingDate";
import { Location } from "./components/Location";
import { Information } from "./components/Information";
import { Guestbook } from "./components/Guestbook";
import { Account } from "./components/Account";
import { ScrollReveal } from "./components/ScrollReveal";
import { GroqChatbot } from "./components/GroqChatbot";
import { mockWeddingData } from "./data/mockData";
import "./App.css";
// import WeddingQRCode from "./components/QRCode";

function App() {
  return (
    <div className="app">
      <ScrollReveal direction="fade" delay={0.15}>
        <Hero data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <Invitation data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.2}>
        <Interview data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <Gallery data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.15}>
        <WeddingDate
          weddingDate={mockWeddingData.weddingDate}
          weddingTime={mockWeddingData.weddingTime}
        />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <Location data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.2}>
        <Information />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <Guestbook data={mockWeddingData} />
      </ScrollReveal>

      <ScrollReveal direction="fade" delay={0.15}>
        <Account data={mockWeddingData} />
      </ScrollReveal>

      {/* <WeddingQRCode /> */}

      <footer className="footer">
        <p>© 2026 Mintae & Naeun Wedding</p>
      </footer>

      <GroqChatbot />
    </div>
  );
}

export default App;
