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

const Theme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'aquamarine';
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

  const handleThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  return (
    <div className={styles.themeContainer}>
      <div className={styles.themeHeader}>
        <h1 className={styles.title}>Theme Configuration</h1>
        <p className={styles.subtitle}>Select your preferred color scheme</p>
        
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
  );
};

export default Theme;