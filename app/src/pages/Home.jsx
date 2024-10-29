import styles from './Home.module.css';

const Home = () => {
    return (
        <div className = {styles.h1}>
            <h1>Welcome to Automat.io</h1>
            <div className = {styles.h2}>
                <h2>Email: </h2>
            </div>
            <div className = {styles.container}>
                <input type="email" placeholder="Enter your email" className={styles.input} />
            </div>
            <div className = {styles.h2}>
                <h2>Header: </h2>
            </div>
            <div className = {styles.container}>
                <input type="text" placeholder="Enter your header" className={styles.input} />
            </div>
            <div className = {styles.h2}>
                <h2>Message: </h2>
            </div>
            <div className = {styles.container}>
                <input type="text" placeholder="Enter your message" className={styles.input} />
            </div>
         <div className = {styles.container}>
            <button>Send Message</button>
        </div>
        </div>
    );
};

export default Home;
