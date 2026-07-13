// App.tsx
import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Detail } from './pages/Detail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<Detail />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
