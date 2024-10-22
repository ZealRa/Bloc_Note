import React from "react";
import Showdown from "showdown";

const NoteDisplay = ({ markdown }) => {
  const converter = new Showdown.Converter();
  const htmlContent = converter.makeHtml(markdown);

  return (
    <div className="note-display">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />{" "}
    </div>
  );
};

export default NoteDisplay;
