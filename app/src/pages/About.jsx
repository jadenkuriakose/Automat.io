import styles from './About.module.css';

const About = () => {
    return (
        <div className = {styles}>
            <h1>About Automat.io</h1>
            <p>Automat.io allows you to automate emails to yourself and others to remind yourself of tasks</p>
            <p>Individuals can use this site to note their own needs and ensure they or their colleagues are reminded of deadlines</p>
            <p>Creating an account allows an individual to ensure that their notes and automated emails are saved and continue to send</p>
            <p>Have fun and make sure to use this app ethically</p>
        </div>
    );
};

export default About;