import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>Automat.io</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/analyze">Message  Analyzer</Link></li>
                <li><Link to="/notes">Tasks</Link></li>
                <li><Link to="/save">Template Safe</Link></li>
                <li><Link to="/generator">Message Generator</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
