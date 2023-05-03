import React, { useEffect } from "react";
import NotesPage from "../Pages/NotesPage";
import LandingPage from "../Pages/LandingPage";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("redux-notes-user");
    if (!localUser) navigate("/login");
  });

  return (
    <>
      <NotesPage />
    </>
  );
};

export default Index;
