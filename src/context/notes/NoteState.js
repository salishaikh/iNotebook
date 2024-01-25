import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);
  // const state = {
  //     "name" : "salish",
  //     "age" : "20"
  // }

  //get all notes
  const getNotes = async (token) => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    console.log(json);

    setNotes(json);
  };


  //add note
  const addNote = async (title, description, tag ,token) => {
    // let tok = token;
    // if(!tok) tok = localStorage.getItem('token')
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        // "auth-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhMjI1MGFkYTM3NTAzMTQ4ZGY3MzMwIn0sImlhdCI6MTcwNTEyNjcyOH0.5HL3RAjGHnUNBR7QgAMxShamMZpiNBv8r5nbthbd1a4",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);

    const note = await response.json()
    setNotes(notes.concat(note));
  };

  //delet note
  const deletNote = async (id) => {
    // API CALL 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

     
    });
    console.log(response);
    const json = response.json();
    console.log(json);

    console.log("deleeted with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
   
    }
    console.log(notes);
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deletNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
