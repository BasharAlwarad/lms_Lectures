import { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import Nav from './components/Nav';
import Login1 from './pages/Login1';
import Login2 from './pages/Login2';
import Login3 from './pages/Login3';
import Login4 from './pages/Login4';
import Login5 from './pages/Login5';
import Login6 from './pages/Login6';
import Login7 from './pages/Login7';
import Login8 from './pages/Login8';
import Login9 from './pages/Login9';
import Login10 from './pages/Login10';
import Login11 from './pages/Login11';

export default function App() {
  function useRenderCount() {
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(`Render count: ${renderCount.current}`);
  }
  useRenderCount();
  return (
    <RecoilRoot>
      <Router>
        <div>
          <Nav />
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login1" element={<Login1 />} />
              <Route path="/login2" element={<Login2 />} />
              <Route path="/login3" element={<Login3 />} />
              <Route path="/login4" element={<Login4 />} />
              <Route path="/login5" element={<Login5 />} />
              <Route path="/login6" element={<Login6 />} />
              <Route path="/login7" element={<Login7 />} />
              <Route path="/login8" element={<Login8 />} />
              <Route path="/login9" element={<Login9 />} />
              <Route path="/login10" element={<Login10 />} />
              <Route path="/login11" element={<Login11 />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}
