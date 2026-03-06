import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BizKimiz from './pages/BizKimiz';
import Iletisim from './pages/Iletisim';
import Blog from './pages/Blog';
import MaltaDilOkullari from './pages/MaltaDilOkullari';
import MaltaDilOkuluFiyatlari from './pages/MaltaDilOkuluFiyatlari';
import MaltaKonaklama from './pages/MaltaKonaklama';
import MaltaOgrenciVizesi from './pages/MaltaOgrenciVizesi';
import MaltaWorkAndStudy from './pages/MaltaWorkAndStudy';
import MaltaYazOkullari from './pages/MaltaYazOkullari';
import MaltaYazOkulu from './pages/MaltaYazOkulu';
import GizlilikPolitikasi from './pages/GizlilikPolitikasi';
import KVKK from './pages/KVKK';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biz-kimiz" element={<BizKimiz />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/malta-dil-okullari" element={<MaltaDilOkullari />} />
            <Route path="/malta-dil-okulu-fiyatlari" element={<MaltaDilOkuluFiyatlari />} />
            <Route path="/malta-konaklama" element={<MaltaKonaklama />} />
            <Route path="/malta-ogrenci-vizesi" element={<MaltaOgrenciVizesi />} />
            <Route path="/malta-work-and-study" element={<MaltaWorkAndStudy />} />
            <Route path="/malta-yaz-okullari" element={<MaltaYazOkullari />} />
            <Route path="/malta-yaz-okulu" element={<MaltaYazOkulu />} />
            <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
            <Route path="/kvkk" element={<KVKK />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
