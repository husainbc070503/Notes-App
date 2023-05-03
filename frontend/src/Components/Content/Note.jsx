import React from "react";
import { useGlobalContext } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom";

const Note = ({ note }) => {
  const { title, content, _id, category, createdAt, updatedAt } = note;
  const { setEditNote, setIsEditing, deleteNote } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button fw-bold fs-5 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${_id}`}
          aria-expanded="false"
          aria-controls={`collapse${_id}`}
        >
          <span>{title}</span>
        </button>
      </h2>
      <div id={`collapse${_id}`} className="accordion-collapse collapse">
        <div className="accordion-body">
          <span className="badge bg-success fw-bold">{category}</span>
          <p className="mt-4">{content}</p>
          <div className="d-flex mt-5 align-items-center justify-content-between">
            <span className="text-secondary">
              <p> Created on: {createdAt.substring(0, 10)}</p>
              <p>Last edited on: {updatedAt.substring(0, 10)}</p>
            </span>
            <div>
              <i
                className="fa fa-edit text-success"
                onClick={() => {
                  setEditNote(note);
                  setIsEditing(true);
                  navigate("/addNote");
                }}
              ></i>
              <i
                className="fa fa-trash ms-2 text-danger"
                onClick={() => deleteNote(_id)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
