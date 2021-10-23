import React from "react";
import { debounce } from "lodash";
import Sidebar from "./sidebar";
import InputBox from "./inputBox";
import { deleteNote, getNotes, saveNote } from "./../services/noteService";
import auth from "../services/authService";

class Notes extends React.Component {
  state = {
    notes: [],
    selectedNoteIndex: 0,
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      const { data: notes } = await getNotes(user._id);
      this.setState({ notes });
    }
  }

  handleNoteSelect = (noteIndex) => {
    this.setState({ selectedNoteIndex: noteIndex });
  };

  handleAddNote = async () => {
    const newNote = { title: "New Note", body: "" };
    const notes = [...this.state.notes, newNote];
    this.setState({ notes });

    const user = auth.getCurrentUser();
    if (user) {
      newNote.userId = user._id;
      const { data: savedNote } = await saveNote(newNote);
      newNote._id = savedNote._id;
    }
  };

  handleNoteEdit = async (noteEdits) => {
    const noteIndex = this.state.selectedNoteIndex;
    const allNotes = [...this.state.notes];
    allNotes[noteIndex] = { ...allNotes[noteIndex], ...noteEdits }; // noteEdits will override any changes from allNotes[noteIndex]

    this.setState({ notes: allNotes });
    const user = auth.getCurrentUser();
    if (user) this.saveNote(allNotes[noteIndex]);
  };

  saveNote = debounce(async (note) => {
    await saveNote(note);
  }, 1000);

  handleDelete = async (noteIndex) => {
    const user = auth.getCurrentUser();
    const allNotes = [...this.state.notes];
    const noteToDelete = allNotes[noteIndex];
    allNotes.splice(noteIndex, 1);
    this.setState({ notes: allNotes });
    if (user) await deleteNote(noteToDelete._id);
  };

  render() {
    const { notes, selectedNoteIndex } = this.state;
    const { user } = this.props;
    return (
      <div className="app">
        <Sidebar
          notes={this.state.notes}
          onNoteSelect={this.handleNoteSelect}
          onAddNote={this.handleAddNote}
          selectedNoteIndex={selectedNoteIndex}
          onTitleChange={this.handleNoteEdit}
          onDelete={this.handleDelete}
          user={user}
        />
        <InputBox
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
          onChange={this.handleNoteEdit}
        />
      </div>
    );
  }
}

export default Notes;
