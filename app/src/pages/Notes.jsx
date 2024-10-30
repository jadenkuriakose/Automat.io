// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './Notes.module.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateNote = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      if (editIndex !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === editIndex ? noteText : note
        );
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, noteText]);
      }
      setNoteText('');
    }
  };

  const editNote = (index) => {
    setNoteText(notes[index]);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Task List</h1>
      <input
        type="text"
        placeholder="Enter your task"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button} onClick={addOrUpdateNote}>
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
      <ul className={styles.notesList}>
        {notes.map((note, index) => (
          <li key={index} className={styles.noteItem}>
            <p>{note}</p>
            <div className={styles.noteActions}>
              <button onClick={() => editNote(index)} className={styles.button}>
                Edit
              </button>
              <button onClick={() => deleteNote(index)} className={styles.button}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;