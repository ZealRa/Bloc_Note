import React, { useState, useEffect } from "react";
import MarkdownInput from "./components/MarkDownInput";
import NoteDisplay from "./components/NoteDisplay";
import "./styles/main.scss";

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [selectedNote, setSelectedNote] = useState(
    notes[0] || { title: "", content: "" }
  );

  // Sauvegarder les notes dans le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleContentChange = (newContent) => {
    setSelectedNote((prevNote) => ({
      ...prevNote,
      content: newContent,
    }));
  };

  const handleTitleChange = (newTitle) => {
    setSelectedNote((prevNote) => ({
      ...prevNote,
      title: newTitle,
    }));
  };

  const handleSaveNote = () => {
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex(
        (note) => note.title === selectedNote.title
      );
      if (existingNoteIndex > -1) {
        prevNotes[existingNoteIndex] = selectedNote;
      } else {
        prevNotes.push(selectedNote);
      }
      return [...prevNotes];
    });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={() => setSelectedNote({ title: "", content: "" })}>
          Nouvelle note
        </button>
        <ul>
          {notes.map((note, index) => (
            <li key={index} onClick={() => setSelectedNote(note)}>
              <strong>{note.title}</strong>
              <p>{note.content.split(" ").slice(0, 15).join(" ")}...</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="note-editor">
        <NoteDisplay markdown={selectedNote.content} />
        <MarkdownInput
          note={selectedNote}
          onContentChange={handleContentChange}
          onTitleChange={handleTitleChange}
        />
        <button onClick={handleSaveNote}>Sauvegarder</button>
      </div>
    </div>
  );
};

export default App;
