import React from "react";

class InputBox extends React.Component {
  render() {
    const { notes, selectedNoteIndex: noteIndex, onChange } = this.props;
    const note = notes[noteIndex];

    return (
      <textarea
        onChange={(e) => onChange({ body: e.currentTarget.value })}
        className="textarea"
        value={note ? note.body : ""}
      />
    );
  }
}

export default InputBox;
