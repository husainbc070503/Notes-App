import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Contexts/Context";

const AddNote = () => {
  const { addNote, editNote, isEditing, editingNote } = useGlobalContext();

  const [note, setNote] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    !isEditing ? addNote(note) : editingNote(editNote._id, note);
  };

  useEffect(() => {
    isEditing
      ? setNote(editNote)
      : setNote({ title: "", category: "", content: "" });
  }, [isEditing]);

  return (
    <div className="container mt-4">
      <div className="card mx-auto">
        <div className="card-header py-3">
          <h2 className="text-center fs-1 fw-bold">Add Note</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row pb-4">
              <div className="col-md-6">
                <label htmlFor="title" className="my-3 fw-bold fs-4">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title.."
                  name="title"
                  className="form-control border border-secondary"
                  required
                  value={note.title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="my-3 fw-bold fs-4">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category.."
                  name="category"
                  className="form-control border border-secondary"
                  required
                  value={note.category}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="fw-bold fs-4">
                Content
              </label>
              <textarea
                name="content"
                className="form-control mt-3 border border-secondary"
                rows="5"
                placeholder="Content.."
                required
                value={note.content}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="buttons my-3">
              <button type="submit" className="btn btn-success me-3">
                {isEditing ? "Edit" : "Add"}
              </button>
              <button type="reset" className="btn btn-danger me-3">
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer py-3">
          {isEditing ? "Editing" : "Creating"} On -{" "}
          {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default AddNote;
