import React, { useState, useEffect } from "react";

const MarkdownInput = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Met à jour le titre et le contenu quand la note change
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  // Appelle onSave à chaque changement de contenu
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    console.log(newContent); // Affiche le contenu dans la console
    onSave(newContent); // Appelle la fonction de callback fournie par le parent
  };

  // Appelle onSave quand le bouton "Sauvegarder" est cliqué
  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <div className="note-editor">
      <input
        type="text"
        className="note-title-input"
        placeholder="Titre de la note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="note-content-textarea"
        rows="10"
        value={content}
        onChange={handleContentChange} // Utilise la fonction pour gérer les changements
      />
      <button className="save-note-button" onClick={handleSave}>
        Sauvegarder
      </button>
    </div>
  );
};

export default MarkdownInput;
