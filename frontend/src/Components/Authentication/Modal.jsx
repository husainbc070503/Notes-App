import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../utils/API";

const Modal = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [change, setChange] = useState({
    otp: "",
    password: "",
  });

  const handleChange = (e) =>
    setChange({ ...change, [e.target.name]: e.target.value });

  const handleSendLink = async () => {
    if (!email) {
      toast.error("Please enter email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/api/user/sendLink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP send successfully via email.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setShow(!show);
        return;
      } else {
        toast.error(`${data.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handlePassSubmit = async () => {
    try {
      const res = await fetch(`${url}/api/user/updatePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: parseInt(change.otp),
          password: change.password,
          email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated Successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setShow(!show);
        setChange({ otp: "", password: "" });
        setEmail("");

        return;
      } else {
        toast.error(`${data.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleClick = () => {
    setShow(false)
    setEmail("");
    setChange({
      otp: "",
      password: "",
    });
  };

  return (
    <>
      <div
        type="button"
        className="mt-4 badge bg-secondary"
        data-bs-toggle="modal"
        data-bs-target="#linkModal"
      >
        Forgot Password?
      </div>

      <div
        className="modal fade"
        id="linkModal"
        tabIndex={-1}
        aria-labelledby="linkModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="linkModalLabel">
                {show ? "Change Password" : "Send Link"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClick}
              />
            </div>
            <div className="modal-body">
              {show ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="otp" className="fs-5 mb-3 fw-bold">
                      OTP
                    </label>
                    <input
                      type="number"
                      placeholder="OTP.."
                      className="form-control"
                      required
                      name="otp"
                      value={change.otp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="fs-5 mb-3 fw-bold">
                      Password
                    </label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <i
                          className={`fa-solid fa-${showPass ? "lock-open" : "lock"
                            }`}
                        ></i>
                      </span>
                      <input
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        required
                        name="password"
                        value={change.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email.."
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={show ? handlePassSubmit : handleSendLink}
                className="btn btn-outline-primary"
              >
                {show ? "Save" : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
