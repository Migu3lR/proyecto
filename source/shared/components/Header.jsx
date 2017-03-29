import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.css';

function Header() {
    return (
        <header className={styles.className.header}>
            <h1>
                Miprimera app cpon react
            </h1>

            <nav role="navigation">
                <Link to="/">
                    Home
                </Link>
                <a href="https://platzi.com" target="_blank">
                    Platzi
                </a>
            </nav>
        </header>
    )
};

export default Header;
