import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/Context";

const Signup = () => {
  const { registerUser } = useGlobalContext();

  const [show, setShow] = useState(false);

  const [authUser, setAuthUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setAuthUser({ ...authUser, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(authUser);
  };

  return (
    <div className="container">
      <div className="authenticate pt-4">
        <div className="auth-card p-4 rounded-3 mx-auto">
          <div className="header">
            <h1 className="text-center fw-bold">Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="fs-5 mb-3 fw-bold">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Type.."
                name="name"
                value={authUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="fs-5 mb-3 fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Type.."
                name="email"
                value={authUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="fs-5 mb-3 fw-bold">
                Password
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  onClick={() => setShow(!show)}
                >
                  <i
                    className={`fa-solid fa-${show ? "lock-open" : "lock"}`}
                  ></i>
                </span>
                <input
                  type={show ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={authUser.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-5 d-flex align-items-center justify-content-between">
              <div>
                <button type="submit" className="btn btn-success me-3">
                  Sign Up
                </button>
                <button type="reset" className="btn btn-danger">
                  Reset
                </button>
              </div>
              <Link
                to="../login"
                style={{ textDecoration: "none", color: "grey" }}
              >
                Already a user? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
