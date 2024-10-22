import React from "react";
import Showdown from "showdown";

const NoteDisplay = ({ markdown }) => {
  const converter = new Showdown.Converter();
  const htmlContent = converter.makeHtml(markdown);

  return (
    <div
      className="note-display"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default NoteDisplay;
