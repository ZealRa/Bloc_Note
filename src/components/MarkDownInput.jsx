import React from "react";

const MarkdownInput = ({ note, onContentChange, onTitleChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Titre de la note"
        value={note.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        value={note.content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Écris ta note en Markdown ici..."
      />
    </div>
  );
};

export default MarkdownInput;
