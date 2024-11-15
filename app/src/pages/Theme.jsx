// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import styles from './Theme.module.css';

const themes = {
  aquamarine: {
    '--primary-color': '#7FFFD4',
    '--secondary-color': '#458B74'
  },
  cyan: {
    '--primary-color': '#00FFFF',
    '--secondary-color': '#008B8B'
  },
  lavender: {
    '--primary-color': '#9370DB',
    '--secondary-color': '#B170DB'
  }
};

const backgroundThemes = {
  dark: {
    '--background-color': '#2E2E2E',
    '--text-color': '#FFFFFF',
    '--button-color': '#000000'
  },
  light: {
    '--background-color': '#FFFFFF',
    '--text-color': '#000000',
    '--button-color': '#000000'
  },
  gradient: {
    '--background-color': 'linear-gradient(45deg, #2E2E2E, var(--primary-color))',
    '--text-color': '#FFFFFF',
    '--button-color': '#FFFFFF'
  }
};

const Theme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'aquamarine';
  });

  const [backgroundTheme, setBackgroundTheme] = useState(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    return savedBackground && backgroundThemes[savedBackground] ? savedBackground : 'light';
  });

  useEffect(() => {
    if (themes[currentTheme]) {
      const root = document.documentElement;
      Object.entries(themes[currentTheme]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      localStorage.setItem('selectedTheme', currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (backgroundThemes[backgroundTheme]) {
      const root = document.documentElement;
      Object.entries(backgroundThemes[backgroundTheme]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      localStorage.setItem('selectedBackground', backgroundTheme);
    }
  }, [backgroundTheme]);

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  const handleBackgroundChange = (event) => {
    setBackgroundTheme(event.target.value);
  };

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>Theme Configuration</h1>
      <div className={styles.themeContainer}>
      <p className={styles.subtitle}>Select your preferred color scheme</p>
        <div className={styles.themeHeader}>
          
          <div className={styles.selectWrapper}>
            <select 
              value={currentTheme}
              onChange={handleThemeChange}
              className={styles.themeSelect}
            >
              <option value="aquamarine">Aquamarine</option>
              <option value="cyan">Cyan</option>
              <option value="lavender">Lavender</option>
            </select>
          </div>

          <p className={styles.subtitle}>Select your preferred background</p>

          <div className={styles.selectWrapper}>
            <select 
              value={backgroundTheme}
              onChange={handleBackgroundChange}
              className={styles.themeSelect}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="gradient">Gradient</option>
            </select>
          </div>
        </div>

        <div className={styles.colorPreview}>
          <div className={styles.previewGrid}>
            <div className={`${styles.colorBox} ${styles.primary}`}>
              <span>Primary Color</span>
              <code className={styles.colorCode}>{themes[currentTheme]['--primary-color']}</code>
            </div>
            <div className={`${styles.colorBox} ${styles.secondary}`}>
              <span>Secondary Color</span>
              <code className={styles.colorCode}>{themes[currentTheme]['--secondary-color']}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme;
