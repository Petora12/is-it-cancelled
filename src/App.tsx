import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';
import { Footer } from './components/Footer';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Detail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
