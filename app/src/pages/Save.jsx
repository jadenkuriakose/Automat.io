import './index.css';
import { useState } from 'react';
import styles from './Save.module.css';

const Save = () => {
    const [template, setTemplate] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [savedTemplates, setSavedTemplates] = useState([]);

    const handleSave = () => {
        if (template.trim()) {
            const newTemplate = {
                id: Date.now(),
                text: template
            };
            setSavedTemplates([...savedTemplates, newTemplate]);
            setTemplate('');
        }
    };

    const handleDelete = (templateId) => {
        setSavedTemplates(savedTemplates.filter(template => template.id !== templateId));
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className = {styles.background}>
        <div className={styles.pageContainer}>
            <div className={`${styles.templateContainer} ${isExpanded ? styles.expanded : ''}`}>
                <div className={styles.contentWrapper}>
                    <div className={styles.header}>
                        <h1>Template Safe</h1>
                        <button 
                            onClick={handleToggleExpand}
                            className={styles.expandButton}
                        >
                            {isExpanded ? '↙' : '↗'}
                        </button>
                    </div>

                    <div className={styles.templateForm}>
                        <textarea 
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            placeholder="Enter a Message Template"
                            className={`${styles.templateTextarea} ${isExpanded ? styles.expanded : ''}`}
                        />
                        
                        <button 
                            onClick={handleSave}
                            disabled={!template.trim()}
                            className={styles.saveButton}
                        >
                            Save Template
                        </button>

                        {isExpanded && (
                            <div className={styles.savedTemplates}>
                                <h2>Saved Templates</h2>
                                {savedTemplates.length === 0 ? (
                                    <p className={styles.noTemplates}>No saved templates yet</p>
                                ) : (
                                    savedTemplates.map((savedTemplate) => (
                                        <div 
                                            key={savedTemplate.id}
                                            className={styles.savedTemplateItem}
                                        >
                                            <div className={styles.templateContent}>
                                                <p>{savedTemplate.text}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(savedTemplate.id)}
                                                className={styles.deleteButton}
                                                aria-label="Delete template"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Save;