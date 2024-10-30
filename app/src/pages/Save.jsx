import './index.css';
import styles from './Save.module.css';

const Save = () => {
    return (
        <div className={styles}>
            <h1>Template Safe</h1>
            <div className = {styles.container}>
            <textarea 
                placeholder="Enter a Message Template" 
                className={styles.textarea}
                rows="3" 
            />
                <button className={styles.button}>Save Message</button>
            </div>
        </div>
    );
}

export default Save;