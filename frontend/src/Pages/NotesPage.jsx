import React from "react";
import { Link } from "react-router-dom";
import Notes from "../Components/Content/Notes";
import { useGlobalContext } from "../Contexts/Context";

const NotesPage = () => {
  const { search, setSearch, user } = useGlobalContext();

  return (
    <div className="container mt-5 pb-4">
      <div className="header row justify-content-between flex-wrap">
        <h1 className="fs-2 col-md-6 fw-bold" id="header">
          Welcome Back, {user && user.name}
        </h1>
        <form className="col-md-6">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search notes.."
              value={search}
              onChange={(e) => {
                let str = e.target.value;
                let char = str[0] ? str[0].toUpperCase() : "";
                str = char + str.substring(1);
                setSearch(str);
              }}
            />
          </div>
        </form>
      </div>

      <Link to="addNote" className="btn btn-primary my-3">
        Create Note
      </Link>

      <hr />

      <Notes />
    </div>
  );
};

export default NotesPage;
