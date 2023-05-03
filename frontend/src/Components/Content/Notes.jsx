import React from "react";
import { useGlobalContext } from "../../Contexts/Context";
import Note from "./Note";
import Loading from "../Loading";

const Notes = () => {
  const { notes, loading } = useGlobalContext();

  return (
    <div className="container">
      <div className="accordion" id="accordionExample">
        {loading
          ? <Loading />
          : notes?.map((note) => {
            return (
              <div className="accordion-item" key={note._id}>
                <Note note={note} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
