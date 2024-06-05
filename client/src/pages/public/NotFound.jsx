import React, { useEffect } from 'react';
import './NotFound.css';

const NotFound = () => {
    useEffect(() => {
        const colorSwitcher = document.querySelector('[data-theme-color-switch]');
        let currentTheme = 'light';

        colorSwitcher.addEventListener('click', function () {
            const root = document.documentElement;

            if (currentTheme === 'dark') {
                root.style.setProperty('--bg-color', '#fff');
                root.style.setProperty('--text-color', '#000');
                colorSwitcher.textContent = '\u{1F319}';
                currentTheme = 'light';
            } else {
                root.style.setProperty('--bg-color', '#050505');
                root.style.setProperty('--text-color', '#fff');
                colorSwitcher.textContent = '\u{2600}';
                currentTheme = 'dark';
            }

            colorSwitcher.setAttribute('data-theme', currentTheme);
        });
    }, []);

    return (
        <main className="error-page">
            <div className="container">
                <div className="eyes">
                    <div className="eye">
                        <div className="eye__pupil eye__pupil--left"></div>
                    </div>
                    <div className="eye">
                        <div className="eye__pupil eye__pupil--right"></div>
                    </div>
                </div>
                <div className="error-page__heading">
                    <h1 className="error-page__heading-title">Looks like you're lost</h1>
                    <p className="error-page__heading-desciption">404 error</p>
                </div>
                <a className="error-page__button" href="#" aria-label="back to home" title="back to home">
                    back to home
                </a>
            </div>
            <button className="color-switcher" data-theme-color-switch>
                &#127769;
            </button>
        </main>
    );
};

export default NotFound;
