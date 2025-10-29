import { Hero } from "./components/Hero";
import { Invitation } from "./components/Invitation";
import { Interview } from "./components/Interview";
import { Gallery } from "./components/Gallery";
import { Location } from "./components/Location";
import { Information } from "./components/Information";
import { Guestbook } from "./components/Guestbook";
import { Account } from "./components/Account";
import { mockWeddingData } from "./data/mockData";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Hero data={mockWeddingData} />
      <Invitation data={mockWeddingData} />
      <Interview data={mockWeddingData} />
      <Gallery data={mockWeddingData} />
      <Location data={mockWeddingData} />
      <Information />
      <Guestbook data={mockWeddingData} />
      <Account data={mockWeddingData} />

      <footer className="footer">
        <p>© 2026 Mintae & Naeun Wedding</p>
      </footer>
    </div>
  );
}

export default App;
