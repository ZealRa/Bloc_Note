import React from "react";
import Showdown from "showdown";

const NoteDisplay = ({ markdown }) => {
  const converter = new Showdown.Converter();
  const htmlContent = converter.makeHtml(markdown); // Convertit le Markdown en HTML

  return (
    <div className="note-display">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />{" "}
      {/* Affiche le HTML converti */}
    </div>
  );
};

export default NoteDisplay;
