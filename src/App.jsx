import React, { useState, useEffect } from "react";
import MarkdownInput from "./components/MarkDownInput";
import NoteDisplay from "./components/NoteDisplay";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import Showdown from "showdown";

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [selectedNote, setSelectedNote] = useState(
    notes[0] || { title: "", content: "" }
  );
  const [content, setContent] = useState(selectedNote.content);
  const [showPopup, setShowPopup] = useState(false); // État pour gérer le popup

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    if (selectedNote.title === notes[index].title) {
      setSelectedNote(updatedNotes[0] || { title: "", content: "" });
    }
  };

  const handleSaveNote = (newNote) => {
    const updatedNotes = [...notes];
    const noteIndex = notes.findIndex(
      (note) => note.title === selectedNote.title
    );

    if (noteIndex > -1) {
      updatedNotes[noteIndex] = newNote;
    } else {
      updatedNotes.push(newNote);
    }

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Afficher le pop-up de confirmation
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Pop-up visible pendant 3 secondes
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="container">
      {showPopup && <div className="popup">Action effectuée avec succès !</div>}

      <nav className="note-list">
        <button
          className="add-note-button"
          onClick={() => setSelectedNote({ title: "", content: "" })}
        >
          Ajouter une note
        </button>
        <ul>
          {notes.map((note, index) => (
            <li
              key={index}
              className={`note-item ${
                note.title === selectedNote.title ? "note-item-active" : ""
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.content.split(" ").slice(0, 15).join(" ")}...</p>
              </div>
              <button
                className="delete-note-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(index);
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="main-content">
        {selectedNote ? (
          <>
            <NoteDisplay markdown={content} /> {/* Passe le contenu ici */}
            <MarkdownInput
              note={selectedNote}
              onSave={handleContentChange} // Passe la fonction de changement
            />
          </>
        ) : (
          <div className="empty-note-message">Aucune note sélectionnée</div>
        )}
      </div>
    </div>
  );
};

export default App;
