import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Contact } from "./pages/Contact";
// Components
import { Layout } from './components/Layout';

const App = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </Router>
);

export default App;