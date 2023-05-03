import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container" id="landing">
      <div className="content">
        <h1 className="fw-bold mb-4">Welcome to NotesBlog</h1>
        <p className="fs-4">One safe side for all your notes</p>

        <div className="d-flex align-item-center justify-content-around mt-5">
          <Link to="signup" className="btn btn-danger">
            Sign up
          </Link>

          <Link to="login" className="btn btn-success">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
