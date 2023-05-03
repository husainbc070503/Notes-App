import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../utils/API";

const NotesContext = createContext();

const NotesState = ({ children }) => {
  const [user, setUser] = useState();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({});
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("redux-notes-user");
    if (localUser) setUser(JSON.parse(localUser));
  }, [navigate]);

  /* ----------- REGISTRATION --------------- */
  const registerUser = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Registration Successful.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/login");
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

  /* ----------- LOGIN --------------- */
  const loginUser = async ({ email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Loggedin Successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("redux-notes-user", JSON.stringify(data.user));
        navigate("/");
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


  /* ----------- LOGIN --------------- */
  const updateUserDetails = async ({ name, email }) => {
    try {
      const res = await fetch(`${url}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${user.token}`
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Your details updated Successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("redux-notes-user", JSON.stringify(data.user));
        navigate("/");
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

  /* ----------- ADD NOTE --------------- */
  const addNote = async ({ title, category, content }) => {
    try {
      const res = await fetch(`${url}/api/note/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, category, content }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Note created successfully.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/");
        setNotes([...notes, data.note]);
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

  /* ----------- EDIT NOTE --------------- */
  const editingNote = async (id, { title, category, content }) => {
    try {
      const res = await fetch(`${url}/api/note/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, category, content }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Note edited successfully.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        for (let i of notes) {
          if (i._id === id) {
            i.title = title;
            i.category = category;
            i.content = content;
          }
        }

        setNotes(notes);
        setEditNote({});
        setIsEditing(false);
        navigate("/");
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

  /* ----------- EDIT NOTE --------------- */
  const deleteNote = async (id) => {
    try {
      const res = await fetch(`${url}/api/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Note deleted successfully.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setNotes(notes.filter((n) => n._id !== id));
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

  /* ----------- FETCH NOTES --------------- */
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${url}/api/note/fetchNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setNotes(data);
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

  useEffect(() => {
    if (user) {
      setLoading(true);
      setTimeout(() => {
        fetchNotes();
        setLoading(false);
      }, 4000);
    }
  }, [user]);

  return (
    <NotesContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        updateUserDetails,

        notes: notes.filter((n) => n.title.includes(search)),
        loading,
        addNote,
        editingNote,
        deleteNote,

        editNote,
        setEditNote,
        isEditing,
        setIsEditing,

        search,
        setSearch
      }}
    >
      {children}
      <ToastContainer transition={Zoom} />
    </NotesContext.Provider>
  );
};

const useGlobalContext = () => useContext(NotesContext);

export { NotesState, useGlobalContext };
