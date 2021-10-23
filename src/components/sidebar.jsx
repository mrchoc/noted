import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  notes,
  onNoteSelect,
  selectedNoteIndex,
  onAddNote,
  onTitleChange,
  onDelete,
  user,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div>Notes</div>
        <i className="bi bi-plus-lg clickable" onClick={() => onAddNote()}></i>
      </div>
      <div className="list-group">
        {notes.map((note, index) => (
          <div
            key={index}
            className={
              selectedNoteIndex === index
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            onClick={() => onNoteSelect(index)}
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <textarea
                rows="1"
                className={
                  selectedNoteIndex === index
                    ? "title-textarea strong active"
                    : "title-textarea strong"
                }
                value={note.title}
                onChange={(e) =>
                  onTitleChange({ title: e.currentTarget.value })
                }
              />
              <i
                className="bi bi-trash clickable"
                onClick={() => onDelete(index)}
              />
            </div>
            <div className="small">
              {note.body === "" ? "what's on your mind?" : note.body}
            </div>
          </div>
        ))}
      </div>
      {!user && (
        <div className="sidebar-header">
          <NavLink className="link" to="/login">
            Login
          </NavLink>
          <NavLink className="link" to="/register">
            Register
          </NavLink>
        </div>
      )}
      {user && (
        <div className="sidebar-header">
          <NavLink className="link" to="/profile">
            {user.name}
          </NavLink>
          <NavLink className="link" to="/logout">
            Logout
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
