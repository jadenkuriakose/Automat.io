import styles from './Analyzer.module.css';

const Analyzer = () => {
    return (
        <div className={styles.analyzer}>
            <h1>Message Analyzer</h1>
            <div className={styles.container}>
                <textarea 
                    placeholder="Enter your message" 
                    className={styles.textarea}
                    rows="5" 
                />
                <button className={styles.button}>Analyze</button>
            </div>


            <div className={styles.dropdownContainer}>
                <label htmlFor="tone">Choose a tone:</label>
                <select id="tone" className={styles.dropdown}>
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Sincere">Sincere</option>
                </select>
            </div>

            <div className={styles.ring}>
                <span className={styles.ringText}>100%</span>
            </div>
        </div>
    );
}

export default Analyzer;
