import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/Context";

const UpdateProfile = () => {
  const { user, updateUserDetails } = useGlobalContext();
  const [updateUser, setUpdateUser] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails(updateUser);
  };

  return (
    <div className="container">
      <div className="header my-4 text-center">
        <h2 className="fw-bold fs-1">Update Profile</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="mb-3 fs-5 fw-bold">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={updateUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="mb-3 fs-5 fw-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={updateUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="mx-auto d-block my-5 btn btn-info">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
