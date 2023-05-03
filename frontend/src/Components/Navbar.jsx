import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Contexts/Context";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer transition={Zoom} />
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top px-5">
        <div className="container-fluid d-flex align-items-center">
          <NavLink className="navbar-brand" to="/">
            NotesBlog
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("redux-notes-user") ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    My Notes
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
            {localStorage.getItem("redux-notes-user") ? (
              <div className="dropdown">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-light">
                  <li>
                    <Link className="dropdown-item" to="updateProfile">
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={() => {
                      localStorage.removeItem('redux-notes-user')
                      navigate('./login')
                      toast.success("Logout Successfully.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      })
                    }} style={{ cursor: "pointer" }}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="signup" className="btn btn-success ms-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;
