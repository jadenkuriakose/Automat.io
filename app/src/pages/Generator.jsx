import styles from './Generator.module.css';

const Generator = () => {
    return (
    <div className={styles.generator}>
            <h1>Message Generator</h1>
        <div className={styles.container}>
        <textarea 
        placeholder="Enter a prompt to develop a message" 
        className={styles.textarea}
        rows="3" 
        />
        <button className={styles.button}>Generate Message</button>
        </div>          
    </div>
    );
}

export default Generator;
