// src/main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Notes from './pages/Notes';
import Analyzer from './pages/Analyzer';
import Generator from './pages/Generator';
import Save from './pages/Save';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <App />
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/analyze" element={<Analyzer />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/save" element={<Save />} />
        </Routes>
    </Router>
);
