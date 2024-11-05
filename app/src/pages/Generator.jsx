import { useState, useRef } from 'react';
import axios from 'axios';
import styles from './Generator.module.css';

const Generator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const recognitionRef = useRef(null);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setInputText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const generateMessage = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/generate-email', { prompt: inputText });
      setGeneratedMessage(response.data.email_message);
    } catch (error) {
      console.error('Error generating message:', error);
      setGeneratedMessage('Failed to generate message.');
    }
  };

  return (
    <div>
      <h1 className={styles.h1}>Message Generator</h1>
      <div className={styles.container}>
        <div className={styles.textareaContainer}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a prompt to develop a message"
            className={styles.textarea}
          />
        </div>
        <button
          onClick={toggleRecording}
          className={`${styles.micButton} ${isRecording ? styles.recording : ''}`}
          title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
        >
          {isRecording ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.micIcon} ${styles.recording}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.micIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          )}
        </button>
        <button className={styles.button} onClick={generateMessage}>Generate Message</button>
      </div>
      {generatedMessage && <div className={styles.generatedMessage}>{generatedMessage}</div>}
    </div>
  );
};

export default Generator;
