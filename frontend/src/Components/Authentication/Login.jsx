import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/Context";
import Modal from "./Modal";

const Login = () => {
  const { loginUser } = useGlobalContext();

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  return (
    <div className="container">
      <div className="authenticate pt-4">
        <div className="auth-card p-4 rounded-3 mx-auto">
          <div className="header">
            <h1 className="text-center fw-bold">Login</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="fs-5 mb-3 fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Type.."
                name="email"
                value={user.email}
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
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-5 d-flex align-items-center justify-content-between">
              <div>
                <button type="submit" className="btn btn-success me-3">
                  Sign In
                </button>
                <button type="reset" className="btn btn-danger">
                  Reset
                </button>
              </div>
              <Link
                to="../signup"
                style={{ textDecoration: "none", color: "grey" }}
              >
                Register yourself?
              </Link>
            </div>
          </form>

          <Modal />
        </div>
      </div>
    </div>
  );
};

export default Login;
