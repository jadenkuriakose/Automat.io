// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';  
import './index.css';
import styles from './Analyzer.module.css';

const Analyzer = () => {
    const [message, setMessage] = useState('');
    const [tone, setTone] = useState('Professional');
    const [ringText, setRingText] = useState('100');  
    const [feedbackText, setFeedbackText] = useState('');  


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleToneChange = (e) => {
        setTone(e.target.value);
    };

    const handleGrade = async () => {
        if (message.trim() === '') {
            setRingText('0');
            return;
        }

        try {
            // Sending the message and tone to the Flask API using Axios
            const response = await axios.post('http://127.0.0.1:8080/grade-email', {
                prompt: message,
                tone: tone,
            });

            // Check if the response is successful
            if (response.status === 200) {
                setRingText(response.data.grade_message);  // Update the ring text with the analysis result
            } else {
                setRingText('Analysis failed.');
            }
        } catch (error) {
            console.error('Error analyzing message:', error);
            setRingText('Error occurred.');
        }
    };

    const handleAnalyze = async () => {

        try {
            // Sending the message and tone to the Flask API using Axios
            const response = await axios.post('http://127.0.0.1:8080/feedback', {
                prompt: message,
                tone: tone,
            });

            // Check if the response is successful
            if (response.status === 200) {
                setFeedbackText(response.data.feedback); 
                console.log(response.data)
            } else {
                setFeedbackText('Analysis failed.');
            }
        } catch (error) {
            console.error('Error analyzing message:', error);
            setFeedbackText('Error occurred.');
        }
    };

    return (
        <div className={styles.analyzer}>
            <h1>Message Analyzer</h1>
            <div className={styles.container}>
                <textarea 
                    placeholder="Enter your message" 
                    className={styles.textarea}
                    rows="5" 
                    value={message}
                    onChange={handleMessageChange} 
                />
                <button className={styles.button} onClick={handleAnalyze}>Analyze</button>
                <button className={styles.button} onClick={handleGrade}>Grade</button>
            </div>

            <div className={styles.dropdownContainer}>
                <div className={styles.selectWrapper}>
                    <label htmlFor="tone">Choose a tone:</label>
                    <select 
                        id="tone" 
                        className={styles.dropdown}
                        value={tone}
                        onChange={handleToneChange}  
                    >
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Sincere">Sincere</option>
                    </select>
                </div>
            </div>

            <div 
                className={styles.ring} 
                style={{
                    background: `conic-gradient(var(--primary-color) ${ringText}%, transparent 0%)`
                }}
            >
                <span className={styles.ringText}>{ringText}</span>
            </div>
            <div className={styles.feedback}>
                <span>{feedbackText}</span>
            </div>
        </div>
    );
}

export default Analyzer;

